import { Bookmark, BookmarkCheck } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";
import { saveHeadshot, saveCustomImage } from "@/services/api/services";
import { useUser } from "@/contexts/UserContext";
import { useImage } from "@/contexts/ImageContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
function SaveImageButton({imageUrl, size})
{
    const [saveState, setSaveState] = useState("notSaved")
    const { user } = useUser()
    const { state: imageState } = useImage()
    const { toast } = useToast()
    
    async function handleSaveImage(src) {
        const userId = user?.$id
     
        setSaveState("saving")
        try {
            if (imageState.mode === "headshot") {
                const response = await saveHeadshot(userId, src)
                console.log(response)
            } else if (imageState.mode === "customImage") {
                const response = await saveCustomImage(userId, src)
                console.log(response)
               
            } 
            setSaveState("saved")
            toast({
                description: "Image saved", })
        } catch (error) {
            setSaveState("notSaved")
            toast({
                description: "Error saving image", })
            console.error("Error saving image:", error)
        }
    }
    let content=null;
    switch (saveState) {
        case "notSaved":
            content=<Bookmark size={size}/>
            break;
        case  "saving":
            content=( <RotatingLines
            strokeWidth="4"
            animationDuration="0.75"
            strokeColor="grey"
            height={String(size)}
            width={String(size)}
        />)
        break;
        case "saved":
            content= (<BookmarkCheck size={size}/>)
            break;
        default:
            content=  content=<Bookmark size={size}/>
            break;
    }

   return(
    <button
    className="block  text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 "
    onClick={(e) => {
        e.stopPropagation()

        handleSaveImage(imageUrl)
    }}
    >
    {" "}
    {content}
    </button>
    )
}
export default SaveImageButton