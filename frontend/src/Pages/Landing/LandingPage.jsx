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
           
            <h2 className="text-2xl md:text-5xl z-40 relative bg-clip-text text-transparent bg-gradient-to-b p-2 from-black to-black/75 tracking-wide mx-auto text-center font-bold  mt-48 mb-24"
            id="howItWorks"
            >
            <span >
            How It Works: Upload, Train, and Create – Effortless Visual Magic.
            </span>
        
            <Sparkles size={32} className="text-purple-500 ml-4 inline" />
        
           
            </h2>
            <ImageFlow />
            <HeadshotSection />
            <PricingSection />
            <Footer />
        </div>
    )
}
