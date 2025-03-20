import appImage from "@/assets/home.png"
import Footer from "@/Components/LandingPage/Footer"
import HeadshotSection from "@/Components/LandingPage/HeadshotSection"
import Hero from "@/Components/LandingPage/Hero"
import ImageFlow from "@/Components/LandingPage/ImageFlow"
import PricingSection from "@/Components/Pricing"
import Window from "@/Components/Window"
import FAQSection from "@/Components/LandingPage/FAQSection"
import { Helmet } from "react-helmet-async"
export default function LandingPage() {
    return (
        <>
        <Helmet>
        <title>SnapStudio - AI Headshot & Photo Generator</title>
      <meta name="description" content="Generate AI-powered headshots, Images and clothing models instantly." />
      <meta name="keywords" content="AI headshot generator, AI photo editor, AI image generator AI marketing poster, AI clothing model" />
  
        </Helmet>
        <div className="relative  mx-auto">
            <Hero />
            <div className="max-w-[52rem] flex justify-center max-h-[32rem] mx-auto md:mt-36 mt-24">
            <Window>
                <video
                    alt="app running"
                    className="h-full w-full object-fill"
                    autoPlay
                    muted
                    loop
                >
                    <source src={`https://qlyojdnywhpjejyxukld.supabase.co/storage/v1/object/public/videos//headshot3%20(1).mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Window>
            </div>
           
            <h1 className="relative z-[30] text-4xl  text-center mt-36 mb-24 font-bold p-2"
            id="howItWorks"
            >
            <span className=" bg-gradient-to-r from-black to-black/75 bg-clip-text text-transparent" >
            Upload, Train, and Create – Effortless Visual 
            <span
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text"
            >
            &nbsp;Magic
            </span>
            </span>
        
            
        
           
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
