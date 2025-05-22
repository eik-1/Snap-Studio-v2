import { useImage } from "@/contexts/ImageContext"
import { Image } from "lucide-react"
import ResultImageGrid from "./ResultImageGrid"

function ResultSection() {
    const { state: imageState } = useImage()
    const { generationStatus } = imageState
    let content
    if (generationStatus.status === "idle") {
        content = (
            <div className="flex  h-full items-center ">
                <div className="flex flex-col items-center justify-center h-max w-max mx-auto -translate-y-10">
                    <Image size={64} className="text-gray-200" />
                    <h2 className=" mt-4 font-medium text-gray-500">
                        No images generated yet
                    </h2>
                </div>
            </div>
        )
    } else {
        content = (
            <ResultImageGrid
                images={imageState.generatedImageUrls}
                usedFor="generatedImage"
                className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 "
            />
        )
    }

    return <div className="h-full w-full  p-4">{content}</div>
}

export default ResultSection
