import { Trash2 } from "lucide-react"
import { RotatingLines } from "react-loader-spinner"
import { useUser } from "@/contexts/UserContext"
import { useToast } from "@/hooks/use-toast"
import { deleteSavedImage } from "@/services/api/services"
import { useImage } from "@/contexts/ImageContext"
function DeleteImageButton({ imageUrl, size }) {
    const { user } = useUser()
    const { toast } = useToast()
    const { state: imageState, dispatch: imageDispatch } = useImage()
    console.log(imageUrl)
    async function handleDeleteImage(src) {
        const userId = user?.$id

        console.log("deleting image...")
        imageDispatch({
            type: "SET_IMAGE_DELETE_STATUS",
            payload: { url: src, status: "deleting" },
        })
        try {
            const response = await deleteSavedImage(userId, src)
            console.log(response)
            const latestSavedImages = imageState.savedImages.filter(
                (image) => image.imageUrl !== src,
            )
            imageDispatch({
                type: "SET_SAVED_IMAGES",
                payload: latestSavedImages,
            })
            console.log("image deleted & updated")
            toast({
                description: "Image deleted",
            })
        } catch (error) {
            imageDispatch({
                type: "SET_IMAGE_DELETE_STATUS",
                payload: { url: src, status: "notDeleted" },
            })
            toast({
                description: "Error deleting image, try again",
            })
            console.error("Error deleting image:", error)
        }
    }
    let content = null
    const deleteState = imageState.savedImages.find(
        (image) => image.imageUrl === imageUrl,
    )?.deleteState

    switch (deleteState) {
        case "notDeleted":
            content = <Trash2 size={size} />
            break
        case "deleting":
            content = (
                <RotatingLines
                    strokeWidth="4"
                    animationDuration="0.75"
                    strokeColor="white"
                    height={String(size)}
                    width={String(size)}
                />
            )
            break
        default:
            content = content = <Trash2 size={size} />
            break
    }

    return (
        <button
            className="block  text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 "
            onClick={(e) => {
                e.stopPropagation()

                handleDeleteImage(imageUrl)
            }}
        >
            {" "}
            {content}
        </button>
    )
}
export default DeleteImageButton
