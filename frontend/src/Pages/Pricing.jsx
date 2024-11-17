import { Check } from "lucide-react"
import { useState } from "react"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/UI/Card"
import { Switch } from "@/Components/UI/Switch"

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(false)

    const plans = [
        {
            title: "Basic",
            monthlyPrice: 15,
            yearlyMonthlyPrice: 12.5,
            originalPrice: 20,
            features: [
                "100 AI-generated images per month",
                "Basic editing tools",
                "Standard resolution output",
                "Email support",
            ],
        },
        {
            title: "Pro",
            monthlyPrice: 35,
            yearlyMonthlyPrice: 29,
            originalPrice: 40,
            features: [
                "Unlimited AI-generated images",
                "Advanced editing tools",
                "High-resolution output",
                "Priority email and chat support",
                "Custom AI model fine-tuning",
            ],
            highlight: true,
        },
    ]

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12 text-base-content">
                <div className="inline-block bg-primary text-primary-content rounded-full px-4 py-1 text-sm font-semibold mb-4">
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
                {plans.map((plan) => {
                    const price = isAnnual
                        ? plan.yearlyMonthlyPrice
                        : plan.monthlyPrice
                    const totalAnnualPrice = plan.yearlyMonthlyPrice * 12
                    const savings = (
                        ((plan.originalPrice - price) / plan.originalPrice) *
                        100
                    ).toFixed(0)

                    return (
                        <Card
                            key={plan.title}
                            className={`flex flex-col ${plan.highlight ? "border-primary border-2" : ""}`}
                        >
                            {plan.highlight ? (
                                <div className="bg-primary text-primary-content text-center py-2 text-sm font-semibold">
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
                                            <Check className="text-success mr-2 h-5 w-5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="mt-auto">
                                <button className="w-full bg-primary text-primary-content py-2 rounded-md">
                                    {plan.highlight ? "Get Started" : "Try Now"}
                                </button>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
