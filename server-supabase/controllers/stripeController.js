import dotenv from "dotenv";
import Stripe from "stripe";

import { client } from "../configs/posthog.js";
import supabase from "../configs/supabase.js";
import ApiResponse from "../utils/ApiResponse.js";
import { plans } from "../utils/stripePlans.js";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const signinSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from("Subscription")
    .select("*")
    .eq("email", email);

  if (error) {
    throw error;
  }
  return data;
}

export async function stripeWebhook(req, res) {
  let event;

  if (signinSecret) {
    const sig = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, signinSecret);
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      return res
        .status(400)
        .json(new ApiResponse(400, "Webhook Error", { error: err.message }));
    }
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ["line_items"],
          }
        );

        const customerId = session?.customer;
        const customer = await stripe.customers.retrieve(customerId); // Get customer details

        const priceId = session?.line_items?.data[0]?.price.id;
        const plan = plans.find((p) => p.priceId === priceId); // Get plan details

        if (!plan) {
          break;
        }

        let user;
        let planCredits;
        let modelCredits;
        let planName;
        let planType;

        // Set plan credits based on plan
        if (plan.title === "BasicMonth") {
          planCredits = 1000;
          modelCredits = 1;
          planName = "Basic";
          planType = "Monthly";
        } else if (plan.title === "ProMonth") {
          planCredits = 5000;
          modelCredits = 3;
          planName = "Pro";
          planType = "Monthly";
        } else if (plan.title === "BasicYear") {
          planCredits = 12000;
          modelCredits = 12;
          planName = "Basic";
          planType = "Yearly";
        } else if (plan.title === "ProYear") {
          planCredits = 60000;
          modelCredits = 36;
          planName = "Pro";
          planType = "Yearly";
        }

        // Check if user exists in database
        if (customer.email) {
          user = await findUserByEmail(customer.email);

          // If user does not exist, create a new user
          if (user.length === 0) {
            const { error } = await supabase
              .from("Subscription")
              .insert([
                {
                  email: customer.email,
                },
              ])
              .select();

            if (error) {
              console.log("Error creating new user: ", error);
              throw error;
            }
          }
        }

        // Update user subscription details
        const { error } = await supabase
          .from("Subscription")
          .update({
            customer_id: customerId,
            has_subscribed: true,
            credits: planCredits,
            model_credits: modelCredits,
            price_id: priceId,
            plan_name: planName,
            plan_type: planType,
            start_time: new Date(),
          })
          .eq("email", customer.email);

        if (error) {
          console.log("Error updating subscription: ", error);
          throw error;
        }

        // Capture event in PostHog
        client.capture({
          distinctId: customer.email,
          event: "subscription purchased",
          properties: {
            plan_name: planName,
            plan_type: planType,
            price_id: priceId,
            credits: planCredits,
            model_credits: modelCredits,
          },
        });

        break;
      }
      case "customer.subscription.deleted": {
        // Revoke Access To Product
        const subscription = await stripe.subscriptions.retrieve(
          event.data.object.id
        );
        console.log("Sub: ", subscription);

        const { data, error } = await supabase
          .from("Subscription")
          .update({
            has_subscribed: false,
            credits: 0,
            model_credits: 0,
            price_id: "",
            plan_name: "",
            plan_type: "",
            start_time: null,
          })
          .eq("customer_id", subscription.customer);

        if (error) {
          throw error;
        }

        console.log("Subscription deleted: ", data);

        client.capture({
          distinctId: subscription.customer,
          event: "subscription cancelled",
        });

        break;
      }
      // case "customer.session.expired": {
      //   break;
      // } // If customer don't pay and leave checkout page
      // case "customer.subscription.updated": {
      // } // If customer changes subscription (renews)
      // case "invoice.payment_failed": {
      // } // If payment fails (email them or wait until the end of the grace period)
      // case "invoice.paid": {
      // } // If payment is successful (give them access back)
      default:
        break;
    }
  } catch (err) {
    res.status(400).json(new ApiResponse(400, "Error", { error: err.message }));
  }
}
