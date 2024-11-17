import { Camera, ShoppingBag } from "lucide-react"

import { useUser } from "@/contexts/UserContext"
import SparklesText from "../UI/SparklesText"
import InputOutputCompare from "./InputOutputCompare"

function Hero() {
    return (
        <div className="relative">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:py-24 lg:px-0 lg:py-28">
                <div className="grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-2">
                    <div className="flex flex-col justify-start gap-4">
                        <div className="flex items-center gap-4 mb-6">
                            {/* <Flame className="h-12 w-12 text-orange-500" /> */}
                            <h1 className="text-6xl font-extrabold text-secondary-content">

                                Your{" "}
                                <SparklesText
                                    className="text-secondary"
                                    text="AI Photographer"
                                />
                            </h1>
                        </div>

                        <p className="text-xl text-neutral mb-8">
                            Get custom images of you, any way you envision. With
                            just a few photos of yourself and a simple prompt,
                            you can create stunning, customized images that
                            bring your ideas to life
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Camera className="h-6 w-6 text-secondary" />
                                <span className="text-lg">
                                    <span className="font-semibold hover:text-secondary cursor-pointer">
                                        Take 100% AI photos
                                    </span>{" "}
                                    in any pose, place or action
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <ShoppingBag className="h-6 w-6 text-secondary" />
                                <span className="text-lg">
                                    <span className="font-semibold hover:text-secondary  cursor-pointer">
                                        Try on clothes on your model
                                    </span>{" "}
                                    for your Shopify store
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Email Box */}
                    <InputOutputCompare />
                </div>
            </div>
        </div>
    )
}

export default Hero
