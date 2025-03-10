import { Check } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/UI/Card"
import { Switch } from "@/Components/UI/Switch"
import { useUser } from "@/contexts/UserContext"

export const plans = {
    monthly: [
        {
            title: "Basic",
            price: 15,
            originalPrice: 20,
            link: import.meta.env.VITE_BASICMONTHLY_URL,
            priceId: import.meta.env.VITE_BASICMONTHLY_ID,
            features: [
                "100 AI-generated images per month",
                "1 AI model per month",
                "Basic editing tools",
                "Standard resolution output",
                "Email support",
            ],
            highlight: false,
        },
        {
            title: "Pro",
            price: 35,
            originalPrice: 40,
            link: import.meta.env.VITE_PROMONTHLY_URL,
            priceId: import.meta.env.VITE_PROMONTHLY_ID,
            features: [
                "500 AI-generated images per month",
                "3 AI models per month",
                "Advanced editing tools",
                "High resolution output",
                "Priority email and chat support",
                "Access to Fasion model (coming soon)",
                "Access to AI video generation (coming soon)",
            ],
            highlight: true,
        },
    ],
    annual: [
        {
            title: "Basic",
            price: 12.5,
            originalPrice: 20,
            link: import.meta.env.VITE_BASICYEARLY_URL,
            priceId: import.meta.env.VITE_BASICYEARLY_ID,
            features: [
                "1200 AI-generated images per year",
                "12 AI models per year",
                "Basic editing tools",
                "Standard resolution output",
                "Email support",
            ],
            highlight: false,
        },
        {
            title: "Pro",
            price: 29,
            originalPrice: 40,
            link: import.meta.env.VITE_PROYEARLY_URL,
            priceId: import.meta.env.VITE_PROYEARLY_ID,
            features: [
                "6000 AI-generated images per year",
                "36 AI models per year",
                "Advanced editing tools",
                "High resolution output",
                "Priority email and chat support",
                "Access to Fasion model (coming soon)",
                "Access to AI video generation (coming soon)",
            ],
            highlight: true,
        },
    ],
}

export default function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(false)

    const navigate = useNavigate()
    const { user } = useUser()

    return (
        <div className="container mx-auto px-4 py-16 mt-24" id="pricing">
            <div className="text-center mb-12 text-base-content">
                <div className="inline-block bg-yellow-100 text-yellow-700 rounded-full px-4 py-1 text-sm font-semibold mb-4">
                    🚀 Launch discount — 25% OFF 🚀
                </div>
                <h1 className="text-4xl font-bold mb-4">
                    Unleash Your Creativity with AI
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Generate stunning images with our cutting-edge AI
                    technology. Choose the plan that fits your needs.
                </p>
                <div className="flex items-center justify-center space-x-4">
                    <label htmlFor="pricing-switch">Monthly</label>
                    <Switch
                        id="pricing-switch"
                        checked={isAnnual}
                        onCheckedChange={setIsAnnual}
                    />
                    <label htmlFor="pricing-switch">Annual</label>
                    {/* <span className="text-sm text-success font-semibold w-24 text-left">
                        {isAnnual ? "Save up to 20%" : ""}
                    </span> */}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {(isAnnual ? plans.annual : plans.monthly).map((plan) => {
                    const price = plan.price
                    const url = plan.link
                    const priceId = plan.priceId
                    const totalAnnualPrice = plan.price * 12
                    const savings = (
                        ((plan.originalPrice - price) / plan.originalPrice) *
                        100
                    ).toFixed(0)

                    return (
                        <Card
                            key={plan.title}
                            className={`flex flex-col ${plan.highlight ? "border-purple-300 border-2" : ""}`}
                        >
                            {plan.highlight ? (
                                <div className="bg-purple-500 text-white text-center py-2 text-sm rounded-t-md font-semibold">
                                    MOST POPULAR
                                </div>
                            ) : (
                                <div className="py-5"></div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    {plan.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 flex-grow">
                                <div className="text-4xl font-bold">
                                    ${price}
                                    <span className="text-lg font-normal text-gray-500">
                                        /{isAnnual ? "mo" : "mo"}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <span className="line-through">
                                        ${plan.originalPrice}
                                    </span>{" "}
                                    {isAnnual
                                        ? `$${totalAnnualPrice} billed yearly`
                                        : `$${price} billed monthly`}
                                </div>
                                <div className="text-sm text-success font-semibold h-5">
                                    {isAnnual ? `Save ${savings}%` : ""}
                                </div>
                                <ul className="space-y-2">
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-center"
                                        >
                                            <Check className="text-green-500 mr-2 h-5 w-5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="mt-auto">
                                {user ? (
                                    <a
                                        target="_blank"
                                        href={
                                            url +
                                            "?prefilled_email=" +
                                            user.email
                                        }
                                        className="w-full bg-purple-500 text-white py-2 rounded-md text-center"
                                        rel="noreferrer"
                                    >
                                        {plan.highlight
                                            ? "Get Started"
                                            : "Try Now"}
                                    </a>
                                ) : (
                                    <button
                                        onClick={() => navigate("/login")}
                                        className="w-full bg-purple-500 text-white py-2 rounded-md"
                                        rel="noreferrer"
                                    >
                                        {plan.highlight
                                            ? "Get Started"
                                            : "Try Now"}
                                    </button>
                                )}
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
