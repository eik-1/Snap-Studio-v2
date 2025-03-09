import appImage from "@/assets/collection.png"
import Footer from "@/Components/LandingPage/Footer"
import HeadshotSection from "@/Components/LandingPage/HeadshotSection"
import Hero from "@/Components/LandingPage/Hero"
import ImageFlow from "@/Components/LandingPage/ImageFlow"
import PricingSection from "@/Components/Pricing"
import Window from "@/Components/Window"

export default function LandingPage() {
    return (
        <div className="h-full">
            <Hero />
            <Window>
                <img
                    src={appImage}
                    alt="app running"
                    className="h-full w-full object-contain"
                />
            </Window>

            <ImageFlow />
            <HeadshotSection />
            <PricingSection />
            <Footer />
        </div>
    )
}
