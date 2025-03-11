import appImage from "@/assets/home.png"
import Footer from "@/Components/LandingPage/Footer"
import HeadshotSection from "@/Components/LandingPage/HeadshotSection"
import Hero from "@/Components/LandingPage/Hero"
import ImageFlow from "@/Components/LandingPage/ImageFlow"
import PricingSection from "@/Components/Pricing"
import Window from "@/Components/Window"
import { Sparkles } from "lucide-react"
export default function LandingPage() {
    return (
        <div className="relative  mx-auto">
            <Hero />
            <div className="max-w-full flex justify-center max-h-full mx-auto mt-48">
            <Window>
                <img
                    src={appImage}
                    alt="app running"
                    className="h-full w-full object-fill"
                />
            </Window>
            </div>
           
            <h1 className="text-5xl text-center mt-36 mb-24 font-bold p-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent"
            id="howItWorks"
            >
            <span >
            How It Works: Upload, Train, and Create – Effortless Visual Magic.
            </span>
        
            <Sparkles size={32} className="text-purple-500 ml-4 inline" />
        
           
            </h1>
            <ImageFlow />
            <HeadshotSection />
            <PricingSection />
            <Footer />
        </div>
    )
}
