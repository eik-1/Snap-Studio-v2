import { RotatingLines } from "react-loader-spinner"

import { useSubscription } from "@/contexts/SubscriptionContext"
import { CoinsIcon } from "@/data/Icons"
import { useState, useEffect, useRef } from "react"
import {  Camera, Shirt, Box,  } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

function Credits() {
    const { subscription } = useSubscription()

    const [isVisible, setIsVisible] = useState(false)
    const creditsTabRef = useRef(null)

    function handleClickOutside(e) {
        if (
            creditsTabRef.current &&
            !creditsTabRef.current.contains(e.target)
        ) {
            setIsVisible(false)
        }
    }
    useEffect(() => {
        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isVisible])

    return (
        <div
            className="relative flex items-center justify-center font-sans"
            ref={creditsTabRef}
        >
            <div
                className="h-max  min-w-16 w-max flex items-center justify-center py-2 px-4 rounded-full border shadow-sm hover:shadow-md gap-2 cursor-pointer relative font-sans bg-white/80 backdrop-blur-md"
                onClick={() => setIsVisible(!isVisible)}
            >
                <div className="w-max h-max flex items-center justify-center gap-2">
                    <CoinsIcon className="h-3 w-3 sm:w-4 sm:h-4" />
                </div>
                <div>
                    <p className="text-xs text-black/80  font-semibold flex items-center justify-center ">
                        {typeof subscription?.credits !== "undefined" ? (
                            subscription.credits
                        ) : (
                            <RotatingLines
                                strokeWidth="4"
                                animationDuration="0.75"
                                strokeColor="grey"
                                height="12"
                                width="12"
                            />
                        )}
                    </p>
                </div>
            </div>
            <AnimatePresence>{isVisible && <CreditsTab />}</AnimatePresence>
        </div>
    )
}





function CreditsTab() {
    // Mock subscription data for demo
    const { subscription } = useSubscription()

    const maxImageCredits =
        subscription?.plan_name === "Basic"
            ? subscription?.plan_type === "Yearly"
                ? 12000
                : 1000
            : subscription?.plan_name === "Pro"
              ? subscription?.plan_type === "Yearly"
                  ? 60000
                  : 5000
              : 0;

    const maxFashionCredits =
        subscription?.plan_name === "Pro"
            ? subscription?.plan_type === "Yearly"
                ? 3000
                : 250
            : 0;

    const maxModels =
        subscription?.plan_name === "Basic"
            ? 1
            : subscription?.plan_name === "Pro"
              ? 3
              : 0;

    const imageCredits = subscription?.credits || 0;
    const fashionCredits = subscription?.fashion_credits || 0;
    const modelsRemaining = subscription?.model_credits || 0;

    return (
        <motion.div
            className="absolute  -right-10 sm:right-0 top-12 mt-2 w-72 bg-white/85 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-2 z-10 overflow-hidden animate-fadeIn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
                {/* Header Section */}
                <div className="
                   
                    px-5 py-4 relative overflow-hidden
                ">
                   
                    <div className="flex items-center gap-3 relative">
                        <div className="
                            w-10 h-10 rounded-xl 
                            flex items-center justify-center
                            
                        ">
                            <CoinsIcon className="w-5 h-5 text-black/80" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-black/90 leading-tight">
                                Credit Balance
                            </h3>
                            <p className="text-xs text-black/65 mt-0.5 font-medium">
                                {subscription?.plan_name?.charAt(0).toUpperCase() +
                                    subscription?.plan_name?.slice(1) || "No"}{" "}
                                <span className="text-black/50">•</span> {subscription?.plan_type || ""}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Credits Section */}
                <div className="p-4 space-y-4">
                    {/* Image Credits */}
                    <div className="group relative">
                        <div className="
                            absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] to-indigo-500/[0.02] 
                            rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        " />
                        <div className="flex items-center gap-3 relative">
                            <div className="
                                w-9 h-9 rounded-lg
                                flex items-center justify-center shrink-0
                               
                            ">
                                <Camera size={16} className="text-blue-600/90" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-semibold text-black/80 tracking-wide">
                                        IMAGE CREDITS
                                    </span>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-black/80">
                                            {imageCredits.toLocaleString()}
                                        </div>
                                        <div className="text-[10px] text-black/50 font-medium">
                                            of {maxImageCredits.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-black/[0.08] rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className="
                                            h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 
                                            rounded-full transition-all duration-700 ease-out shadow-sm
                                            relative overflow-hidden
                                        "
                                        style={{
                                            width: `${Math.min(100, (imageCredits / maxImageCredits) * 100)}%`,
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fashion Credits - Only for Pro */}
                    {subscription?.plan_name === "Pro" && (
                        <div className="group relative">
                            <div className="
                                absolute inset-0 bg-gradient-to-r from-purple-500/[0.02] to-pink-500/[0.02] 
                                rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            " />
                            <div className="flex items-center gap-3 relative">
                                <div className="
                                    w-9 h-9 rounded-lg 
                                    flex items-center justify-center shrink-0
                                   
                                ">
                                    <Shirt size={16} className="text-purple-600/90" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-xs font-semibold text-black/80 tracking-wide">
                                            FASHION CREDITS
                                        </span>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-black/80">
                                                {fashionCredits.toLocaleString()}
                                            </div>
                                            <div className="text-[10px] text-black/50 font-medium">
                                                of {maxFashionCredits.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-1.5 w-full bg-black/[0.08] rounded-full overflow-hidden shadow-inner">
                                        <div
                                            className="
                                                h-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 
                                                rounded-full transition-all duration-700 ease-out shadow-sm
                                                relative overflow-hidden
                                            "
                                            style={{
                                                width: `${Math.min(100, (fashionCredits / maxFashionCredits) * 100)}%`,
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Models Remaining */}
                    <div className="group relative">
                        <div className="
                            absolute inset-0 bg-gradient-to-r from-emerald-500/[0.02] to-teal-500/[0.02] 
                            rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        " />
                        <div className="flex items-center gap-3 relative">
                            <div className="
                                w-9 h-9 rounded-lg 
                                flex items-center justify-center shrink-0
                               
                            ">
                                <Box size={16} className="text-emerald-600/90" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-semibold text-black/80 tracking-wide">
                                        AVATARS REMAINING
                                    </span>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-black/80">
                                            {modelsRemaining}
                                        </div>
                                        <div className="text-[10px] text-black/50 font-medium">
                                            of {maxModels}
                                        </div>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-black/[0.08] rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className="
                                            h-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 
                                            rounded-full transition-all duration-700 ease-out shadow-sm
                                            relative overflow-hidden
                                        "
                                        style={{
                                            width: `${Math.min(100, (modelsRemaining / maxModels) * 100)}%`,
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="p-2">
                    <button
                        className="
                            group w-full px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide
                            bg-gradient-to-r from-black/90 via-black to-black/90 text-white 
                            shadow-lg border border-black/30 backdrop-blur-sm
                            transition-all duration-300 ease-out relative overflow-hidden
                            hover:shadow-2xl hover:scale-[1.02] hover:from-black hover:to-black/95
                            active:scale-[0.98] active:shadow-md
                        "
                        onClick={() => {
                            // Mock action - replace with actual navigation
                            console.log('Navigate to plan management');
                        }}
                    >
                     
                        <span className="relative">
                            {subscription?.plan_name === "Pro" ? "MANAGE" : "UPGRADE"} PLAN
                        </span>
                    </button>
                </div>
            </motion.div>
        

    );
}



export default Credits
