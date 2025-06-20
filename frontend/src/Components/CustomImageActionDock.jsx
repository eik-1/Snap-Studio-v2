import {
    Clock,
   
    Minus,
    Plus,
    Coins
 
   
} from "lucide-react"

import AvatarDropdown from "./AvatarDropdown"
import { useState, useRef, useEffect } from "react"

import { useImage } from "@/contexts/ImageContext"
import { useModel } from "@/contexts/ModelContext"
import { useNavigation as useBackNavigation } from "@/contexts/NavigationContext"
import { useSubscription } from "@/contexts/SubscriptionContext"
import { useUser } from "@/contexts/UserContext"
import { generateImage } from "@/services/api/services"
import { Button } from "./UI/Button"
import { toast } from "sonner"
import GlowingAnimation from "./GlowingAnimation"
import NumberOfImages from "./NumberOfImages"
import { FaArrowRight as StartIcon } from "react-icons/fa6";

function CustomImageActionDock() {
    const [selectedModel, setSelectedModel] = useState("")
    const [numberOfImages, setNumberOfImages] = useState(1)
    const [error, setError] = useState({
        modelSelect: "",
        numberOfImages: "",
        prompt: "",
    })
    const [prompt, setPrompt] = useState("")
    const { user } = useUser()
    const { dispatch: imageDispatch, state: imageState } = useImage()
    const { dispatch: navDispatch } = useBackNavigation()
    const { state: modelState } = useModel()
    const { updateCredits, subscription } = useSubscription()

    const textAreaRef = useRef(null)
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto"
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
        }
    }, [prompt])

    const trainedModels = modelState.models.filter(
        (model) => model.status === "succeeded",
    )

    /* const { data: fetchedModels = [] } = useQuery({
        queryKey: ["models", user],
        queryFn: () => getUserModels(user.$id),
    })*/



    /*New Changes*/
    function validateForm() {
        if (!selectedModel) {
            setError({
                ...error,
                modelSelect: "Please select a model to generate custom images",
            })
            return false
        }
        return true
    }

    async function handleImageGeneration(userId, modelName, prompt, numImages) {
        imageDispatch({
            type: "SET_GENERATION_STATUS",
            payload: { status: "generating", message: "Generating Images", numberOfImages: numImages },
        })
        subscription?.credits &&
            updateCredits(subscription?.credits - numImages * 10, user?.email)
        try {
            const data = await generateImage(
                userId,
                modelName,
                prompt,
                numImages,
                user.email,
            )
            imageDispatch({
                type: "SET_GENERATED_IMAGE_URLS",
                payload: data.imageUrls,
            })
            imageDispatch({
                type: "SET_GENERATED_CUSTOM_URLS",
                payload: data.imageUrls,
            })
            imageDispatch({
                type: "SET_GENERATION_STATUS",
                payload: {
                    status: "generated",
                    message: "Images generated successfully",
                    numberOfImages: numImages,
                },
            })
            updateCredits(data.remainingCredits, user?.email)
        } catch (error) {
            imageDispatch({
                type: "SET_GENERATION_STATUS",
                payload: {
                    status: "error",
                    message: "Error generating images",
                    numberOfImages: numImages,
                },
            })
            updateCredits(error.data.remainingCredits, user?.email)
            console.log("Error generating images")
            toast.error(
                "Error generating images. Please try again later.",
            )
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        /*New Changes*/
        if (!validateForm()) return
        const numImages = parseInt(numberOfImages)
        // handle > 5 images
        console.log(selectedModel)
        await handleImageGeneration(user.$id, selectedModel, prompt, numImages)
        if (imageState.generationStatus.status === "success") {
            //reset form state or just leave it as it is
        } else if (imageState.generationStatus.status === "error") {
            //handle error  to be implemented
        }
    }

    const handleCreateNewModel = () => {
        navDispatch({
            type: "SET_TAB",
            payload: {
                tab: ["newCustomModelTrainForm"],
            },
        })
    }

    return (
     
              
        <div className="w-11/12 lg:w-4/6  left-1/2 -translate-x-1/2 h-max   absolute bottom-4  z-50 ">
        <div className="w-full h-full relative">
            {imageState?.generationStatus?.status === "generating" && <GlowingAnimation className="-z-10 absolute  h-full w-full   rounded-lg"/>}
           <div className="w-full h-full bg-white/85 backdrop-blur-lg border rounded-3xl px-4 py-3 shadow-md ">
            <form
                onSubmit={handleSubmit}
                id="custom-image-form"
                className="flex flex-col gap-3 "
            >
                <div className="flex-grow w-full min-w-0">
                    <textarea
                        type="text"
                        required
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your image"
                        className="flex w-full rounded-md text-sm placeholder:text-token-text-secondary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50   bg-transparent px-2 py-3 max-md:flex-1 overflow-hidden break-words resize-none h-12 max-h-40"
                        rows="1"
                        spellcheck="false"
                        ref={textAreaRef}
                    ></textarea>
                </div>
                <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between text-xs mt-1  text-gray-500">
                    <div className="flex gap-4 ">
                        {/* Model Selection */}
                       
                            <AvatarDropdown
                                trainedModels={trainedModels}
                                selectedModel={selectedModel}
                                setSelectedModel={setSelectedModel}
                                error={error}
                            />

                            {/* Number of Images */}
                            <NumberOfImages
                                numberOfImages={numberOfImages}
                                setNumberOfImages={setNumberOfImages}
                            />
                            <div className="flex items-center justify-center gap-1">   
                               <Coins className="w-4 h-4"  ></Coins>
                               <p>{numberOfImages*10}</p>
                            </div>
                        </div>


                    {/* Generate Button */}
                    <div className="flex">
                        <button
                            type="submit"
                            form="custom-image-form"
                            className="w-full sm:w-max h-10 px-6 gap-2 flex items-center justify-center  text-sm rounded-full sm:rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white "
                            disabled={
                                imageState.generationStatus.status ===
                                "generating"
                            }
                        >
                            <span className="">Generate</span>
                           <div className="flex items-center justify-center ml-2">
                                <Clock size={12} />
                                <p className="ml-1">{numberOfImages * 15}s</p>
                            </div>
                            
                        </button>
                    </div>
                </div>
            </form>
        </div>
        </div>
        </div>

    )
}
export default CustomImageActionDock