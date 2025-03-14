import appImage from "@/assets/home.png"
import Footer from "@/Components/LandingPage/Footer"
import HeadshotSection from "@/Components/LandingPage/HeadshotSection"
import Hero from "@/Components/LandingPage/Hero"
import ImageFlow from "@/Components/LandingPage/ImageFlow"
import PricingSection from "@/Components/Pricing"
import Window from "@/Components/Window"
import FAQSection from "@/Components/LandingPage/FAQSection"
import { Sparkles } from "lucide-react"
import { Helmet } from "react-helmet-async"
export default function LandingPage() {
    return (
        <>
        <Helmet>
        <title>SnapStudio - AI Headshot & Photo Generator</title>
      <meta name="description" content="Generate AI-powered headshots, Images and clothing models instantly." />
      <meta name="keywords" content="AI headshot generator, AI photo editor, AI image generator AI marketing poster, AI clothing model" />
      <meta property="og:title" content="SnapStudio - AI Headshot & Photo Generator" />
      <meta property="og:description" content="Create professional AI-generated headshots and images." />
      <meta property="og:image" content="https://snapstudio.me/snapstudio-og.png" />
      <meta property="og:url" content="https://snapstudio.me" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://snapstudio.me/snapstudio-og.png" />
        </Helmet>
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
           
            <h1 className="relative z-[30] text-4xl text-center mt-36 mb-24 font-semibold p-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent"
            id="howItWorks"
            >
            <span >
            Upload, Train, and Create – Effortless Visual Magic.
            </span>
        
            <Sparkles size={32} className="text-purple-500 ml-4 inline" />
        
           
            </h1>
            <ImageFlow />
            <HeadshotSection />
            <PricingSection />
            <FAQSection />
            <Footer />
        </div>
        </>
    )
}
