import { Stars } from "lucide-react"
import { useState } from "react"

import { useImage } from "@/contexts/ImageContext"
import { useNavigation } from "@/contexts/NavigationContext"
import { useUser } from "@/contexts/UserContext"
import { generateImage, getUserModels } from "@/services/api/apiReq"
import { useQuery } from "@tanstack/react-query"
import { Button } from "./UI/Button"

function CustomImageForm() {
    const [selectedModel, setSelectedModel] = useState("")
    const [numberOfImages, setNumberOfImages] = useState(1)
    const [prompt, setPrompt] = useState("")
    const { user } = useUser()
    const { handleImageGeneration } = useImage()
    const { dispatch } = useNavigation()

    const { data: fetchedModels = [] } = useQuery({
        queryKey: ["models", user],
        queryFn: () => getUserModels(user.$id),
    })

    async function handleSubmit(e) {
        e.preventDefault()
        const numImages = parseInt(numberOfImages)
        // handle > 5 images
        await handleImageGeneration(user.$id, selectedModel, prompt, numImages)
    }

    const handleCreateNewModel = () => {
        dispatch({
            type: "SET_TAB",
            payload: {
                tab: ["newCustomModelTrainForm"],
            },
        })
    }
    return (
        <div className="w-full h-full mx-auto  bg-white border-r-[1px] relative">
            <div className="h-[90%] w-full m-0 px-4 py-4 overflow-y-scroll oveflow-x-hidden custom-scrollbar">
                <div className="font-sans flex flex-col gap-1 h-max pb-6 border-b-[1px] ">
                    <h1 className="font-sans font-medium tracking-tight text-lg text-purple-500">
                        Generate Image
                    </h1>
                    <p className="text-xs font-regular tracking-tight text-gray-500">
                        {"Generate images using your trained models "}
                    </p>
                </div>
                <form onSubmit={handleImageGeneration} className="mt-4">
                    <div className="flex flex-col h-max pb-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Select Model
                        </label>
                        <p className="text-[0.675rem] font-regular tracking-tight text-gray-500">
                            Choose from your trained models
                        </p>
                        <select
                            required
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            className={`px-3 py-2 mt-2 block w-full  border border-gray-300 rounded-md  focus:ring-slate-500 focus:border-slate-500 text-xs ${fetchedModels.length === 0 && "cursor-not-allowed"} `}
                            disabled={fetchedModels.length === 0}
                        >
                            <option value="" disabled>
                                {fetchedModels.length === 0
                                    ? "No trained models"
                                    : "Select Model"}
                            </option>

                            {fetchedModels.map((model, index) => (
                                <option key={index} value={model.model_name}>
                                    {model.model_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex ">
                        <span className="text-sm font-medium text-neutral-500">
                            Or&nbsp;
                        </span>
                        <button
                            type="button"
                            className="text-sm font-medium text-neutral-500 hover:text-emerald-600 transition-all duration-200 underline"
                            onClick={handleCreateNewModel}
                        >
                            Train New Model
                        </button>
                    </div>
                    <div className="flex flex-col h-max pb-2 mt-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Number of Images
                        </label>
                        <p className="text-[0.675rem] font-regular tracking-tight text-gray-500">
                            {"Number of images to generate (min: 1, max: 5)"}
                        </p>
                        <input
                            type="number"
                            required
                            value={numberOfImages}
                            onChange={(e) => setNumberOfImages(e.target.value)}
                            min="1"
                            max="5"
                            className="px-3 py-2 mt-2 block w-full border border-gray-300 rounded-md  focus:ring-slate-500 focus:border-slate-500 text-sm"
                        />
                    </div>
                    <div className="flex flex-col h-max pb-2 mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Write a prompt
                        </label>
                        <p className="text-[0.675rem] font-regular tracking-tight text-gray-500">
                            {"Describe the image you want to generate"}
                        </p>
                        <textarea
                            type="text"
                            required
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="px-3 py-2 mt-2 min-h-36 block w-full border border-gray-300 rounded-md  focus:ring-slate-500 focus:border-slate-500 text-sm"
                        />
                    </div>
                </form>
            </div>
            <div className="w-full bg-white h-[10%]  fixed bottom-16 sm:bottom-0 sm:relative flex justify-center items-center border-t-[1px]">
                <Button
                    type="button"
                    onClick={handleSubmit}
                    className="w-2/3 mx-auto"
                >
                    <span>Generate Image</span>
                    <Stars />
                </Button>
            </div>
        </div>
    )
}
export default CustomImageForm
