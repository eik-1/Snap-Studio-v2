import { Check, Sparkles } from "lucide-react"
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
          

            <div className="text-center mb-12 relative">
                <div className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 rounded-full px-4 py-2 text-sm font-medium mb-6 shadow-sm">
                    <Sparkles className="h-4 w-4" />
                    <span>Launch discount — 25% OFF</span>
                    <Sparkles className="h-4 w-4" />
                </div>

                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                    Unleash Your Creativity with AI
                </h1>

                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Generate stunning images with our cutting-edge AI
                    technology. Choose the plan that fits your creative journey.
                </p>

                <div className="flex items-center justify-center space-x-4 bg-gray-50 p-3 rounded-full w-max mx-auto shadow-sm">
                    <label
                        htmlFor="pricing-switch"
                        className={`text-sm font-medium ${!isAnnual ? "text-purple-700" : "text-gray-500"}`}
                    >
                        Monthly
                    </label>
                    <div className="relative">
                        <Switch
                            id="pricing-switch"
                            checked={isAnnual}
                            onCheckedChange={setIsAnnual}
                            className={`${isAnnual ? "bg-purple-600" : "bg-purple-400"} transition-colors duration-200`}
                        />
                    </div>
                    <label
                        htmlFor="pricing-switch"
                        className={`text-sm font-medium ${isAnnual ? "text-purple-700" : "text-gray-500"}`}
                    >
                        Annual
                    </label>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {(isAnnual ? plans.annual : plans.monthly).map(
                    (plan, index) => {
                        const price = plan.price
                        const url = plan.link
                        const priceId = plan.priceId
                        const totalAnnualPrice = Math.round(plan.price * 12)
                        const savings = (
                            ((plan.originalPrice - price) /
                                plan.originalPrice) *
                            100
                        ).toFixed(0)

                        return (
                            <Card
                                key={plan.title}
                                className={`flex flex-col rounded-2xl transition-all duration-300 hover:shadow-lg ${
                                    plan.highlight
                                        ? "border-purple-300 border-2 bg-gradient-to-b from-white to-purple-50"
                                        : "hover:border-gray-300"
                                }`}
                            >
                                {plan.highlight ? (
                                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-2 text-sm rounded-t-xl font-medium tracking-wide">
                                        MOST POPULAR
                                    </div>
                                ) : (
                                    <div className="py-5"></div>
                                )}
                                <CardHeader>
                                    <CardTitle
                                        className={`text-2xl ${plan.highlight ? "text-purple-700" : "text-gray-800"}`}
                                    >
                                        {plan.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6 flex-grow">
                                    <div className="flex items-baseline">
                                        <span className="text-5xl font-bold text-gray-900">
                                            ${price}
                                        </span>
                                        <span className="ml-1 text-lg font-normal text-gray-500">
                                            /{isAnnual ? "mo" : "mo"}
                                        </span>
                                    </div>

                                    <div className="flex flex-col space-y-1">
                                        <div className="text-sm text-gray-500">
                                            <span className="line-through">
                                                ${plan.originalPrice}
                                            </span>{" "}
                                            {isAnnual
                                                ? `$${totalAnnualPrice} billed yearly`
                                                : `$${price} billed monthly`}
                                        </div>
                                        {isAnnual && (
                                            <div className="text-sm text-green-600 font-medium">
                                                Save {savings}% with annual
                                                billing
                                            </div>
                                        )}
                                    </div>

                                    <ul className="space-y-3 pt-4">
                                        {plan.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-3"
                                            >
                                                <span
                                                    className={`flex-shrink-0 h-5 w-5 rounded-full ${plan.highlight ? "bg-purple-100" : "bg-gray-100"} flex items-center justify-center mt-0.5`}
                                                >
                                                    <Check
                                                        className={`h-3 w-3 ${plan.highlight ? "text-purple-600" : "text-gray-600"}`}
                                                    />
                                                </span>
                                                <span className="text-gray-700">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter className="mt-auto pb-6">
                                    {user ? (
                                        <a
                                            target="_blank"
                                            href={
                                                url +
                                                "?prefilled_email=" +
                                                user.email
                                            }
                                            className={`w-full py-3 rounded-xl text-center font-medium transition-all duration-200 ${
                                                plan.highlight
                                                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-md hover:shadow-purple-200"
                                                    : "bg-white border border-purple-300 text-purple-700 hover:bg-purple-50"
                                            }`}
                                            rel="noreferrer"
                                        >
                                            {plan.highlight
                                                ? "Get Started"
                                                : "Try Now"}
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => navigate("/login")}
                                            className={`w-full py-3 rounded-xl text-center font-medium transition-all duration-200 ${
                                                plan.highlight
                                                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-md hover:shadow-purple-200"
                                                    : "bg-white border border-purple-300 text-purple-700 hover:bg-purple-50"
                                            }`}
                                        >
                                            {plan.highlight
                                                ? "Get Started"
                                                : "Try Now"}
                                        </button>
                                    )}
                                </CardFooter>
                            </Card>
                        )
                    },
                )}
            </div>
        </div>
    )
}
