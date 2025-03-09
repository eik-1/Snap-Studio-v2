import { Bookmark, BookmarkCheck } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";
import { saveHeadshot, saveCustomImage } from "@/services/api/services";
import { useUser } from "@/contexts/UserContext";
import { useImage } from "@/contexts/ImageContext";
import { useToast } from "@/hooks/use-toast";

function SaveImageButton({imageUrl, size})
{
   
    const { user } = useUser()
    const { state: imageState, dispatch:imageDispatch } = useImage()
    const { toast } = useToast()
    
    async function handleSaveImage(src) {
        const userId = user?.$id
        if(imageState?.imageSaveStatus && imageState.imageSaveStatus.hasOwnProperty(src) && (imageState.imageSaveStatus[src]==="saving" || imageState.imageSaveStatus[src]==="saved"))
        {
            console.log("already saving or saved")
            return
        }
        
        imageDispatch({type:"SET_IMAGE_SAVE_STATUS", payload:{url:src, status:"saving"}})
        try {
            if (imageState.mode === "headshot") {
                const response = await saveHeadshot(userId, src)
                console.log(response)
            } else if (imageState.mode === "customImage") {
                const response = await saveCustomImage(userId, src)
                console.log(response)
               
            } 
            imageDispatch({type:"SET_IMAGE_SAVE_STATUS", payload:{url:src, status:"saved"}})
            toast({
                description: "Image saved", })
        } catch (error) {
            imageDispatch({type:"SET_IMAGE_SAVE_STATUS", payload:{url:src, status:"notSaved"}})
            toast({
                description: "Error saving image", })
            console.error("Error saving image:", error)
        }
    }
    let content=null;
    if(!imageState.imageSaveStatus.hasOwnProperty(imageUrl) || !imageState.imageSaveStatus[imageUrl] || imageState.imageSaveStatus[imageUrl]==="notSaved" ){
        content=<Bookmark size={size}/>

    }
    else if(imageState.imageSaveStatus[imageUrl]==="saving"){
        content=( <RotatingLines
        strokeWidth="4"
        animationDuration="0.75"
        strokeColor="white"
        height={String(size)}
        width={String(size)}    />) 
    }
    else if(imageState.imageSaveStatus[imageUrl]==="saved"){
        content= (<BookmarkCheck size
        ={size}/>)      
    }
   

   return(
    <button
    className="block text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 "
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