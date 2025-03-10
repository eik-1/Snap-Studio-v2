import GalleryImage from "@/Components/LandingPage/GalleryImage"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Copy, X } from "lucide-react"
import { useState } from "react"

import { img1, img2, img3, img4, img5, img6 } from "@/assets/headshot-images"

const trs = {
    type: "spring",
    stiffness: 250,
    damping: 30,
}

const galleryItems = [
    {
        imageUrl: img1,
        prompt: "SEMU male portrait with warm lighting, professional attire, urban background, neutral expression, professional headshot style.",
    },
    {
        imageUrl: img2,
        prompt: "SEMU female portrait with soft side lighting, casual outfit, clean backdrop, slight smile, natural makeup, lifestyle photography style.",
    },
    {
        imageUrl: img3,
        prompt: "SEMU male portrait with dramatic lighting, casual clothing, textured background, contemplative expression, cinematic style.",
    },
    {
        imageUrl: img4,
        prompt: "SEMU female portrait with soft diffused lighting, business casual attire, simple background, confident smile, contemporary portrait style.",
    },
    {
        imageUrl: img5,
        prompt: "SEMU male portrait with natural outdoor lighting, casual street style, urban environment, relaxed posture, candid photography style.",
    },
    {
        imageUrl: img6,
        prompt: "SEMU female portrait with golden hour lighting, casual outfit, outdoor setting, genuine smile, warm color grading, lifestyle photography.",
    },
]

function Gallery() {
    const [selectedIndex, setSelectedIndex] = useState(null)
    const { toast } = useToast()

    const closeModal = () => {
        setSelectedIndex(null)
    }

    const handleNext = (e) => {
        e?.stopPropagation()
        setSelectedIndex((prev) => (prev + 1) % galleryItems.length)
    }

    const handlePrev = (e) => {
        e?.stopPropagation()
        setSelectedIndex((prev) =>
            prev === 0 ? galleryItems.length - 1 : prev - 1,
        )
    }

    const handleKeydown = (e) => {
        switch (e.key) {
            case "ArrowLeft":
                handlePrev()
                break
            case "ArrowRight":
                handleNext()
                break
            case "Escape":
                closeModal()
                break
            default:
                break
        }
    }

    const copyPromptToClipboard = (prompt) => {
        navigator.clipboard.writeText(prompt)
        toast({
            description: "Prompt copied to clipboard",
            duration: 2000,
        })
    }

    return (
        <div className="my-24 py-16">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                    {galleryItems.map((item, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <GalleryImage
                                src={item.imageUrl}
                                index={index}
                                onClick={() => setSelectedIndex(index)}
                            />
                            <div className="relative group">
                                <p className="text-xs text-gray-500 truncate px-1">
                                    {item.prompt.substring(0, 50)}
                                    {item.prompt.length > 50 ? "..." : ""}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for viewing images */}
            <motion.div
                initial={false}
                animate={{ opacity: selectedIndex !== null ? 1 : 0 }}
                className={cn(
                    "fixed inset-0 bg-black/80 backdrop-blur-md z-[90]",
                    selectedIndex === null && "pointer-events-none",
                )}
                onClick={closeModal}
                onKeyDown={selectedIndex !== null ? handleKeydown : undefined}
                tabIndex={selectedIndex !== null ? 0 : -1}
            >
                {selectedIndex !== null && (
                    <div className="fixed inset-0 flex items-center justify-center py-8 px-4">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                        >
                            <X size={24} />
                        </button>
                      

                        <motion.div
                            layoutId={`container-${selectedIndex}`}
                            className=" aspect-square flex flex-col items-center justify-center md:h-max md:w-[30rem] w-full"
                            transition={trs}
                        >
                            {/* Navigation buttons positioned relative to the image only */}
                            <div className="relative w-full h-[28rem] aspect-square rounded-lg">
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors z-50"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors z-50"
                                >
                                    <ChevronRight size={18} />
                                </button>

                                <motion.img
                                    layoutId={`image-${selectedIndex}`}
                                    src={galleryItems[selectedIndex].imageUrl}
                                    alt={`Image ${selectedIndex + 1}`}
                                    className="w-full h-full object-cover rounded-lg"
                                    transition={trs}
                                />
                                
                            </div>
                            <div className="bg-gradient-to-br from-rose-50/65 to-orange-50/65 backdrop-blur-xl p-4 rounded-lg mt-4  z-40 ">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-black/80 font-semibold">
                                                Prompt      
                                            </h2>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    copyPromptToClipboard(
                                                        galleryItems[
                                                            selectedIndex
                                                        ].prompt,
                                                    )
                                                }}
                                                className="flex items-center gap-1 px-2 py-1 bg-black/10 hover:bg-black/20 transition-colors rounded-md text-black text-xs"
                                                title="Copy prompt"
                                            >
                                                <Copy size={12} />
                                                <span>Copy</span>
                                            </button>
                                        </div>

                                        <p className="text-black/90 text-sm leading-relaxed">
                                            {galleryItems[selectedIndex].prompt}
                                        </p>
                                    </div>
                                </div>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default Gallery
