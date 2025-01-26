import { Image } from "lucide-react"
import { Download, Heart } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useImage } from "@/contexts/ImageContext"
//incomplete component: multiple features and functionalities are missing, to be implemented

function ImageResultSection() {
    const { state: imageState } = useImage()
    const [selectedId, setSelectedId] = useState(null)
    const [isHovering, setIsHovering] = useState(false)
    console.log(imageState)
    let content
    switch (imageState.generationStatus.status) {
        case "idle":
            content = <ImageResultEmptyState />
            break
        case "generating":
            content = <ImageResultLoading />
            break
        case "generated":
            content = <ImageResultGrid images={imageState.generatedImageUrls} />
            break
        default:
            content = <ImageResultEmptyState />
    }
    return (
        <>
            <section className="z-50 relative w-full h-full p-4 bg-white flex flex-col items-center gap-6  sm:overflow-y-scroll custom-scrollbar">
                <h2 className="text-lg font-semibold bg-clip-text text-transparent text-center bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500">
                    Your Generated Images
                </h2>
                <div className="z-[100] w-full h-full relative ">
                   {imageState.generationStatus.status==='generating' && <div className="z-0 animate-gradient blur-md   bg-[length:200%_100%] h-full w-full absolute top-0 right-0  bg-gen rounded-lg" />}
                    <div className="z-[100] relative w-full h-full gap-4 p-2 rounded-lg bg-white flex flex-col drop-shadow-sm items-center border-gray-200 border-[1px]">
                        {content}
                    </div>
                </div>
            </section>
        </>
    )
}
function ImageResultEmptyState() {
    return (
        <div className="z-[100] w-full h-full flex flex-col items-center justify-center gap-4 text-gray-300">
            <Image size={64} />
            <p className="text-lg font-medium">No Images Generated Yet</p>
        </div>
    )
}
function ImageResultGrid({ images }) {
    return (
        <div className="z-[100] grid grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 gap-4 gap-y- w-full h-max p-2">
            {images.map((url, index) => (
                <motion.div
                    key={index}
                    layoutId={`container-${index}`}
                    className="relative w-full  aspect-square rounded-lg bg-gray-200 cursor-pointer"
                >
                    <motion.img
                        layoutId={`image-${index}`}
                        src={url}
                        alt={`Grid image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        loading="lazy"
                    />

                    <a
                        className="block absolute h-max w-max top-1 right-1 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 "
                        href={url}
                        download={"image" + index + ".png"}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Download color="white" size={16} />
                    </a>
                </motion.div>
            ))}
        </div>
    )
}
function ImageResultLoading() {
    return (
        <div className="z-[100] w-full h-full flex flex-col items-center justify-center gap-4">
            <p className="text-lg font-medium animate-gradient bg-[length:200%_100%] bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-purple-500 to-orange-500">
                Generating Your Images..
            </p>
        </div>
    )
}
export default ImageResultSection
