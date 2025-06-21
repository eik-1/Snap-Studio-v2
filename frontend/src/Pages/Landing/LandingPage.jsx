import Footer from "@/Components/LandingPage/Footer"
import HeadshotSection from "@/Components/LandingPage/HeadshotSection"
import CustomImageSection from "@/Components/LandingPage/CustomImageSection"
import Hero from "@/Components/LandingPage/Hero"
import ImageFlow from "@/Components/LandingPage/ImageFlow"
import PricingSection from "@/Components/Pricing"
import Window from "@/Components/Window"
import FAQSection from "@/Components/LandingPage/FAQSection"
import { Helmet } from "react-helmet-async"
import {home} from "@/assets/image"
import CompareSection from "@/Components/LandingPage/CompareSection"
import ImageComparisonSlider from "@/Components/LandingPage/InputOutputCompare"
import AnimatedSidebarLayout from "@/Components/LandingPage/Features"

export default function LandingPage() {
    return (
        <>
            <Helmet>
                <title>SnapStudio - AI Headshot & Photo Generator</title>
                <meta
                    name="description"
                    content="Generate AI-powered headshots, Images and clothing models instantly."
                />
                <meta
                    name="keywords"
                    content="AI headshot generator, AI photo editor, AI image generator AI marketing poster, AI clothing model"
                />
            </Helmet>
            <div className="relative  mx-auto font-sans">
                <Hero />
                <div className="max-w-5xl flex justify-center max-h-[48rem] mx-auto md:mt-12 relative rounded-3xl border">
                    <div className="z-10 absolute h-32 w-40 md:h-60 md:w-96 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-300 to-purple-300 p-4 blur-[80px]"></div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-10 md:h-20 w-screen  bg-gradient-to-t from-white via-white/90 to-transparent z-40"></div>
                    
                   
                    
                    <Window>
                      {/*  <video
                            alt="app running"
                            className="h-full w-full object-fill"
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source
                                src={`https://res.cloudinary.com/doac8yyie/video/upload/f_auto:video,q_auto/qwws1afgwc3pb6xdv5mp`}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>*/}
                        <img src={home} alt="df" className="h-full w-full object-cover " />
                    </Window>
                </div>

             <CompareSection/>
             <AnimatedSidebarLayout/>

                <ImageFlow />
             

                <PricingSection />
                <FAQSection />
                <Footer />
            </div>
        </>
    )
}
