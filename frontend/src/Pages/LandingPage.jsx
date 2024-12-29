import Hero from "@/Components/LandingPage/Hero"
import InputOutputImage from "@/Components/LandingPage/InputOutputImage"
import PricingSection from "@/Components/Pricing"
import Window from "@/Components/Window"


export default function LandingPage() {
    return (
        <div className="h-screen">

            <Hero />
            <Window/>
            <InputOutputImage />
            <PricingSection />

        </div>
    )
}
