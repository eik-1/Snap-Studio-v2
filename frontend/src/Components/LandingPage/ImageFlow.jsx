import { david7 as output } from "@/assets/image"
import { david2, david3, david4 } from "@/assets/image"
import { Camera, Sparkles, Upload, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect } from "react"

const ImageFlow = () => {
    const [typewriterText, setTypewriterText] = useState("")
    const [showCursor, setShowCursor] = useState(true)
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    
    const fullPrompt = "Generate image of a man sitting in a restaurant and posing with a drink"
    
    useEffect(() => {
        let index = 0
        const timer = setInterval(() => {
            if (index < fullPrompt.length) {
                setTypewriterText(fullPrompt.slice(0, index + 1))
                index++
            } else {
                setIsTypingComplete(true)
                clearInterval(timer)
            }
        }, 80)
        
        return () => clearInterval(timer)
    }, [])
    
    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 500)
        
        return () => clearInterval(cursorTimer)
    }, [])

    const steps = [
        {
            title: "Upload Your Photos",
            description: "Upload a few high-quality photos to train your personalized AI model",
            completed: true,
            images: [david2, david4, david3],
            icon: <Upload className="text-white" size={20} />,
            color: "purple",
        },
        {
            title: "Craft Your Prompt", 
            description: "Describe the scene you want to create with natural language",
            completed: true,
            prompt: fullPrompt,
            icon: <Sparkles className="text-white" size={20} />,
            color: "indigo",
        },
        {
            title: "Get AI Magic",
            description: "Receive stunning, photorealistic images ready for any use case",
            completed: false,
            resultImage: output,
            icon: <Camera className="text-white" size={20} />,
            color: "violet",
        },
    ]

    const colorMap = {
        purple: {
            gradient: "from-purple-500 to-purple-600",
            light: "from-purple-50 to-purple-100/50",
            accent: "purple-500",
            ring: "ring-purple-100",
        },
        indigo: {
            gradient: "from-indigo-500 to-indigo-600", 
            light: "from-indigo-50 to-indigo-100/50",
            accent: "indigo-500",
            ring: "ring-indigo-100",
        },
        violet: {
            gradient: "from-violet-500 to-violet-600",
            light: "from-violet-50 to-violet-100/50", 
            accent: "violet-500",
            ring: "ring-violet-100",
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 mt-32 lg:py-8">
            {/* Header */}
            <div className="text-center mb-16">
                <motion.h2 
                    className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    How It Works
                </motion.h2>
                <motion.p 
                    className="text-lg text-gray-600 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Create stunning AI-generated photos of yourself in just three simple steps
                </motion.p>
            </div>

            {/* Cards Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative">
              

                {steps.map((step, index) => {
                    const colors = colorMap[step.color]
                    
                    return (
                        <motion.div
                            key={index}
                            className="relative z-10"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            {/* Card */}
                            <motion.div 
                                className="bg-gray-50 border-white border-[6px] rounded-3xl p-8 shadow-lg h-[32rem]   group relative overflow-hidden"
                                
                               
                            >
                                {/* Step Number & Icon */}
                                <div className="flex items-center justify-between mb-6">
                                    <motion.div 
                                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}
                                        whileHover={{ 
                                            scale: 1.1,
                                            rotate: 5,
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {step.icon}
                                    </motion.div>
                                    <div className="text-sm font-bold text-gray-400">
                                        0{index + 1}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Visual Content */}
                                <div className="min-h-[200px] flex items-center justify-center">
                                    {/* Step 1: Upload Images with Bounce Effect */}
                                    {index === 0 && (
                                        <div className="relative">
                                            <div className="flex space-x-3">
                                                {step.images.map((img, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="relative cursor-pointer"
                                                        initial={{ 
                                                            opacity: 0, 
                                                            scale: 0.8, 
                                                            rotate: 0,
                                                            y: 20
                                                        }}
                                                        animate={{ 
                                                            opacity: 1, 
                                                            scale: 1,
                                                            rotate: i === 0 ? -8 : i === 2 ? 8 : 0,
                                                            y: 0
                                                        }}
                                                        transition={{ 
                                                            duration: 0.6, 
                                                            delay: 0.1 * i,
                                                            type: "spring",
                                                            stiffness: 200
                                                        }}
                                                        whileHover={{
                                                            scale: 1.1,
                                                            y: -10,
                                                            rotate: 0,
                                                            transition: {
                                                                type: "spring",
                                                                stiffness: 400,
                                                                damping: 10
                                                            }
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                            transition: { duration: 0.1 }
                                                        }}
                                                    >
                                                        <img
                                                            src={img}
                                                            alt={`Upload ${i + 1}`}
                                                            className="w-16 h-20 object-cover rounded-xl shadow-lg border-2 border-white"
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>
                                            
                                            {/* Animated Upload Loader */}
                                            <motion.div 
                                                className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    rotate: [0, 180, 360]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <Upload size={14} className="text-white" />
                                            </motion.div>
                                            
                                            {/* Upload Progress Dots */}
                                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                                {[0, 1, 2].map((dot) => (
                                                    <motion.div
                                                        key={dot}
                                                        className={`w-2 h-2 rounded-full bg-${colors.accent}`}
                                                        animate={{
                                                            scale: [0.8, 1.2, 0.8],
                                                            opacity: [0.5, 1, 0.5]
                                                        }}
                                                        transition={{
                                                            duration: 1.5,
                                                            repeat: Infinity,
                                                            delay: dot * 0.2
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Typewriter Prompt */}
                                    {index === 1 && (
                                        <div className="w-full">
                                            <motion.div 
                                                className={`bg-gradient-to-br ${colors.light} rounded-2xl p-6 border border-gray-100`}
                                                whileHover={{
                                                    scale: 1.02,
                                                    transition: { duration: 0.2 }
                                                }}
                                            >
                                                <div className="flex items-center gap-2 mb-4">
                                                    <motion.div
                                                        animate={{ rotate: [0, 360] }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <Sparkles size={16} className={`text-${colors.accent}`} />
                                                    </motion.div>
                                                    <span className="text-sm font-semibold text-gray-700">Your Prompt</span>
                                                </div>
                                                
                                                <div className="text-gray-800 text-sm leading-relaxed font-medium min-h-[3rem] flex items-center">
                                                    <span>"{typewriterText}"</span>
                                                    <AnimatePresence>
                                                        {(!isTypingComplete || showCursor) && (
                                                            <motion.span
                                                                className={`inline-block w-0.5 h-4 bg-${colors.accent} ml-1`}
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: showCursor ? 1 : 0 }}
                                                                transition={{ duration: 0.1 }}
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                                
                                                <div className="flex justify-end mt-4">
                                                    <div className="flex space-x-1">
                                                        {[0, 1, 2].map((dot) => (
                                                            <motion.div
                                                                key={dot}
                                                                className={`w-2 h-2 rounded-full bg-${colors.accent}/60`}
                                                                animate={{
                                                                    scale: [1, 1.3, 1],
                                                                    opacity: [0.3, 1, 0.3]
                                                                }}
                                                                transition={{
                                                                    duration: 1.5,
                                                                    repeat: Infinity,
                                                                    delay: dot * 0.3
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* Step 3: Result with Magic Effects */}
                                    {index === 2 && (
                                        <div className="relative">
                                            <motion.div
                                                className="relative cursor-pointer"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6, delay: 0.3 }}
                                                whileHover={{
                                                    scale: 1.05,
                                                    rotateY: 5,
                                                    transition: {
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 20
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={step.resultImage}
                                                    alt="AI Generated result"
                                                    className="w-32 h-40 object-cover rounded-2xl shadow-xl border-2 border-white"
                                                />
                                                
                                                {/* AI Badge with Pulse */}
                                                <motion.div 
                                                    className={`absolute -top-2 -right-2 bg-gradient-to-r ${colors.gradient} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
                                                    animate={{
                                                        scale: [1, 1.1, 1],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                >
                                                    AI ✨
                                                </motion.div>
                                                
                                                {/* Floating Sparkles */}
                                                <motion.div 
                                                    className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full"
                                                    animate={{
                                                        scale: [0.8, 1.2, 0.8],
                                                        opacity: [0.6, 1, 0.6],
                                                        x: [0, 5, 0],
                                                        y: [0, -5, 0]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                                <motion.div 
                                                    className="absolute -bottom-2 -right-1 w-2 h-2 bg-purple-400 rounded-full"
                                                    animate={{
                                                        scale: [0.6, 1, 0.6],
                                                        opacity: [0.4, 0.8, 0.4],
                                                        x: [0, -3, 0],
                                                        y: [0, 3, 0]
                                                    }}
                                                    transition={{
                                                        duration: 1.8,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                        delay: 0.5
                                                    }}
                                                />
                                                <motion.div 
                                                    className="absolute top-1/2 -left-2 w-1.5 h-1.5 bg-blue-400 rounded-full"
                                                    animate={{
                                                        scale: [0.5, 1, 0.5],
                                                        opacity: [0.3, 0.7, 0.3],
                                                        x: [0, -2, 0],
                                                    }}
                                                    transition={{
                                                        duration: 2.2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                        delay: 1
                                                    }}
                                                />
                                            </motion.div>
                                        </div>
                                    )}
                                </div>

                               

                                {/* Hover Arrow */}
                                <motion.div 
                                    className="absolute top-8 right-8"
                                    initial={{ opacity: 0, x: 10 }}
                                    whileHover={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ArrowRight size={20} className="text-gray-400" />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Call to Action */}
             <div className="w-full justify-center flex mt-12" >
                             <button className="group relative px-6 py-4 flex gap-2 bg-gray-900 text-sm  text-white font-semibold rounded-2xl  hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                           Start Creating Now
                           <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                         </button>
                       </div>
                     
        </div>
    )
}

export default ImageFlow