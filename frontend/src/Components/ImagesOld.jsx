/* important this is an old component and is not in use*/

import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"
import axios from "axios"
import { Image, AlertTriangleIcon, Download, Heart } from "lucide-react"
import { FadeLoader } from "react-spinners"

import { useUser } from "@/contexts/UserContext"
import { useImage } from "@/contexts/ImageContext"

function Img() {
    const [selectedId, setSelectedId] = useState(null)
    const [isHovering, setIsHovering] = useState(false)
    const {
        generatedImageUrls: imageUrls,
        generationStatus,
        isSaved,
        setIsSaved,
    } = useImage()
    const { user } = useUser()
    let content = null
    console.log(generationStatus)
    console.log(imageUrls)
    async function handleSaveImage(url, index) {
        console.log(url)
        console.log(index)
        if (isSaved.includes(index)) {
            return
        }
        setIsSaved((prev) => [...prev, index])
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/database/save-image`,
                {
                    userId: user.$id,
                    fileUrl: url,
                },
            )
            console.log("image saved")
        } catch (err) {
            console.log(err)
        }
    }

    if (generationStatus.status === "idle") {
        content = (
            <>
                <div className="w-full h-2/3  p-4 bg-white  rounded-xl flex flex-col justify-center gap-2 drop-shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">
                    Your Generated Images
                </h2>
                <div className="w-full h-full gap-4  p-2 bg-gray-50 rounded-lg  shadow-sm flex flex-col justify-center items-center">
                    <Image size={64} color="lightgray" />
                    <p className="text-center text-neutral-300">No Image is generated, Your Generated images will be shown here.</p>
                </div>
                </div>
                
            </>
        )
    } else if (generationStatus.status === "loading") {
        content = (
            <>
                <div className=" p-4 bg-[#ffffff50] rounded-xl backdrop-blur-sm shadow-sm flex justify-center items-center">
                    <FadeLoader
                        loading={true}
                        height={15}
                        width={5}
                        radius={10}
                        color="#ff4600"
                    />
                </div>
            </>
        )
    } else if (generationStatus.status === "generated") {
        content = (
            <>
                <div className="w-full  p-4 bg-[#ffffff50] rounded-xl backdrop-blur-sm shadow-sm">
                    <div className="grid grid-cols-2 gap-4">
                        {imageUrls.map((url, index) => (
                            <motion.div
                                key={index}
                                layoutId={`container-${index}`}
                                className="aspect-square overflow-hidden rounded-lg shadow-sm bg-white cursor-pointer relative"
                                onClick={() => setSelectedId(index)}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                <motion.img
                                    layoutId={`image-${index}`}
                                    src={url}
                                    alt={`Grid image ${index + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    loading="lazy"
                                />
                                {isHovering && (
                                    <>
                                        <a
                                            className="block absolute h-max w-max top-1 right-1 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 "
                                            href={url}
                                            download={"image" + index + ".png"}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Download color="white" size={16} />
                                        </a>
                                        <div
                                            className="block absolute h-max w-max top-1 right-12 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleSaveImage(url, index)
                                            }}
                                        >
                                            <Heart
                                                color={`${isSaved.includes(index) && "#ff4600"}`}
                                                size={16}
                                                fill={`${isSaved.includes(index) ? "#ff4600" : "white"}`}
                                            />
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {selectedId !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
                            onClick={() => setSelectedId(null)}
                        >
                            <motion.div
                                layoutId={`container-${selectedId}`}
                                className="relative max-w-2xl  h-5/6 overflow-hidden rounded-lg"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <motion.img
                                    layoutId={`image-${selectedId}`}
                                    src={imageUrls[selectedId]}
                                    alt={`Enlarged view ${selectedId + 1}`}
                                    className="w-full h-full object-contain"
                                />
                                <motion.button
                                    className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
                                    onClick={() => setSelectedId(null)}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line
                                            x1="18"
                                            y1="6"
                                            x2="6"
                                            y2="18"
                                        ></line>
                                        <line
                                            x1="6"
                                            y1="6"
                                            x2="18"
                                            y2="18"
                                        ></line>
                                    </svg>
                                </motion.button>
                                <a
                                    className="block absolute h-max w-max top-4 right-16 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 "
                                    href={imageUrls[selectedId]}
                                    download={"image" + selectedId + ".png"}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Download color="white" size={24} />
                                </a>
                                <div
                                    className="block absolute h-max w-max top-4 right-[7rem] text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleSaveImage(
                                            imageUrls[selectedId],
                                            selectedId,
                                        )
                                    }}
                                >
                                    <Heart
                                        color={`${isSaved.includes(selectedId) && "#ff4600"}`}
                                        size={24}
                                        fill={`${isSaved.includes(selectedId) ? "#ff4600" : "white"}`}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        )
    } else {
        content = (
            <>
                <div className="w-full sm:w-3/6 p-4 bg-[#ffffff50] rounded-xl backdrop-blur-sm shadow-sm flex flex-col gap-4 justify-center items-center font-sans">
                    <AlertTriangleIcon size={64} color="red" />
                    <p className="text-gray-500">{generationStatus.message}</p>
                </div>
            </>
        )
    }
    return content
}

export default Img
