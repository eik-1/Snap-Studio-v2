import { Trash2 } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { deleteSavedImage } from "@/services/api/services";
function DeleteImageButton({imageUrl, size, onDelete})
{
    const [deleteState, setDeleteState] = useState("notDeleted")

    const { user } = useUser()
    const { toast } = useToast()
    console.log(imageUrl)
    async function handleDeleteImage(src) {
        const userId = user?.$id
     
        setDeleteState("deleting")
        try {
            await deleteSavedImage(userId, src)
            onDelete(src)
            toast({
                description: "Image deleted", })
            
        } catch (error) {
            setDeleteState("notDeleted")
            toast({
                description: "Error deleting image, try again", })
            console.error("Error deleting image:", error)
        }
    }
    let content=null;
    switch (deleteState) {
        case "notDeleted":
            content=<Trash2 size={size}/>
            break;
        case  "deleting":
            content=( <RotatingLines
            strokeWidth="4"
            animationDuration="0.75"
            strokeColor="white"
            height={String(size)}
            width={String(size)}
        />)
        break;
        default:
            content=  content=<Trash2 size={size}/>
            break;
    }

   return(
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