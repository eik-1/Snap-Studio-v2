import ImageGrid from "@/Components/ImageGrid"
import ErrorIndicator from "@/Components/ErrorIndicator"
import { RotatingLines } from "react-loader-spinner"
import { useParams } from "react-router-dom"
import { useEffect, useState, useCallback } from "react"
import { getSavedHeadshots, getSavedImages } from "@/services/api/services"
import { useUser } from "@/contexts/UserContext"
import { useImage } from "@/contexts/ImageContext"

function SavedImages() {
    const {state:imageState, dispatch:imageDispatch} = useImage()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const { user } = useUser()

    const { category } = useParams()
    const fetchImages = useCallback(async () => {
        console.log("fetching images")
        try {
            let data =
                category === "headshots"
                    ? await getSavedHeadshots(user.$id)
                    : await getSavedImages(user.$id)

            const images = data.map((item) => {
                return {
                    imageUrl: item,
                    deleteState: "notDeleted",
                }
            })
            console.log(data)
            console.log(images)
            imageDispatch({ type: "SET_SAVED_IMAGES", payload: images })
        } catch (error) {
            console.error(error)
            setIsError(error)
        }
        setIsLoading(false)
    }, [category, user.$id])
    useEffect(() => {
        fetchImages()
    }, [fetchImages])

    function retryFetch() {
        setIsLoading(true)
        setIsError(null)
        fetchImages()
    }

    let content = null
    console.log(imageState?.savedImages)

    if (isLoading) {
        content = (
            <div className="absolute top-1/3 inset-x-0 flex justify-center items-center">
                <RotatingLines
                    strokeWidth="3"
                    animationDuration="0.75a"
                    strokeColor="grey"
                    height="42"
                    width="42"
                />
            </div>
        )
    } else if (isError) {
        content = (
            <div className="absolute top-1/3 inset-x-0 flex justify-center items-center">
                <ErrorIndicator handleClick={retryFetch} />
            </div>
        )
    } else if (!imageState.savedImages || imageState.savedImages?.length === 0) {
        content = (
            <div className="absolute top-1/3 inset-x-0 flex justify-center items-center text-gray-500">
                No saved images
            </div>
        )
    } else if (imageState.savedImages) {
        content = (
            <ImageGrid
                images={imageState.savedImages.map((item) => item.imageUrl)}
                className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 "
            />
        )
    }

    return (
        <div className="w-full h-full bg-white relative flex flex-col md:flex-row md:items-center pb-48 md:pb-0 overflow-scroll md:overflow-hidden custom-scrollbar">
            <div className="w-[95%] flex-shrink-0   mx-auto md:mx-0 min-h-36  md:h-[95%] md:my-auto md:w-80  border-b-[1px] md:border-r-[1px] md:border-b-0 border-neutral-200 md:border-b-none ">
                <div className="flex flex-col p-6  items-center mt-10 md:mt-32 gap-2 ">
                    <h2 className="text-3xl leading-relaxed text-center font-semibold bg-clip-text text-transparent  bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500">
                        {`Your saved ${category}`}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Explore your saved images
                    </p>
                </div>
            </div>

            <div className="relative md:h-full flex-grow pt-8 px-4 md:overflow-y-scroll md:custom-scrollbar ">
                {content}
            </div>
        </div>
    )
}
export default SavedImages
