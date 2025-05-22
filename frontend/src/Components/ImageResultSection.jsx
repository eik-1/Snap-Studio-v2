import { Image } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useImage } from "@/contexts/ImageContext"
import ImageGrid from "@/Components/ImageGrid"
import { cn } from "@/lib/utils"
import { useUser } from "@/contexts/UserContext"
//incomplete component: multiple features and functionalities are missing, to be implemented

function ImageResultSection(imageUrl) {
    const { state: imageState } = useImage()
    const { user } = useUser()



    
    let content
    switch (imageState.generationStatus.status) {
        case "idle":
            content = <ImageResultEmptyState />
            break
        case "generating":
            content = <ImageResultLoading />
            break
        case "generated":
            content = (
                <ImageGrid
                    images={imageState.generatedImageUrls}
                    usedFor="generatedImage"
                    className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 "
                />
            )
            break
        default:
            content = <ImageResultEmptyState />
    }
    return (
        <>
            <section className="relative w-full min-h-full pb-32 sm:pb-4 px-4 pt-4 bg-white flex flex-col items-center gap-6  sm:overflow-y-scroll">
             
                <div className="w-full h-full relative  ">
                   

                    <div
                        className={cn(
                            `relative w-full min-h-full sm:min-h-full mb-2 gap-4 p-2 rounded-lg bg-white flex flex-col justify-center shadow-sm  items-center border-gray-200 border-[1px] ${imageState?.generationStatus?.status === "generated" && "h-max justify-start"}`,
                        )}
                    >
                        {content}
                    </div>
                </div>
            </section>
        </>
    )
}
function ImageResultEmptyState() {
    return (
        <div className="w-max h-max  flex flex-col items-center  gap-4 text-gray-300">
            <Image size={64} />
            <p className="text-lg font-medium">No Images Generated Yet</p>
        </div>
    )
}

function ImageResultLoading() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <p className="h-max w-max text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-violet-500 to-cyan-500 bg-[length:200%_100%] animate ">
                Generating Your Images..
            </p>
        </div>
    )
}
export default ImageResultSection
