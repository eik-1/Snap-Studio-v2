/* important this is an old component and is not in use*/

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"


import NumberInput from "./NumberInput"
import { Button } from "./UI/Button"
import Pen from "./PenIcon"
import { useUser } from "@/contexts/UserContext"
import PromptDescription from "./PromptDescription"
import axios from "axios"
import { useImage } from "@/contexts/ImageContext"

export default function PromptForm() {


    const [promptData, setPromptData] = useState({ prompt: "", images: 1 })
    const [isOpen, setIsOpen] = useState(false)
    const [triggerWord, setTriggerWord] = useState(null)
    const { user } = useUser()
    const { generationStatus, setGenerationStatus, setGeneratedImageUrls, trainingState } = useImage()
    useEffect(()=>{

        if(trainingState==="succeeded")
        {
            
                async function fetchTriggerWord()
                {
                    try
                    {

                    
                    const response=await axios.post(`${import.meta.env.VITE_API_URL}/models/get-trigger-word`,{

                        userId:user.$id
                    })
                    console.log(response.data.data)
                    setTriggerWord(response.data.data.triggerWord)
                    }
                    catch(err)
                    {
                        console.log(err)
                    }
            
                   
                }
             
            fetchTriggerWord();
         }
         else
         {
                setTriggerWord(null)
         }
    },[trainingState, user.$id])

    async function handleSubmit(e) {
        console.log(promptData.prompt.trim())
        e.preventDefault()
        if (!promptData.prompt.trim()) {
            setGenerationStatus((prev) => ({
                ...prev,
                status: "error",
                message: "Prompt cannot be empty",
            }))
            return
        }
        setGeneratedImageUrls([])
        setGenerationStatus((prev) => ({
            status: "loading",
            message: "Generating images...",
        }))
        console.log("sending Request...")
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/models/run`,
                {
                    userId: user.$id,
                    prompt: promptData.prompt.trim(),
                    numberOfImages: promptData.images,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )
            const images = response.data.data.output
            console.log(typeof images)
            console.log(images)

            setGeneratedImageUrls((prev) => [...prev, ...images])
            setGenerationStatus((prev) => ({
                ...prev,
                status: "generated",
                message: "Images generated successfully",
            }))
        } catch (err) {
            setGenerationStatus((prev) => ({
                ...prev,
                status: "error",
                message: "Error generating images",
            }))
        }
    }

    return (
        <>
            <PromptDescription
                isOpen={isOpen}
                handleClose={() => {
                    setIsOpen(false)
                }}
            />

            <div className="w-2/5 ml-4 h-max font-sans relative">
                {trainingState !== "succeeded" && (
                    <div
                        className={`h-full w-full z-30 absolute top-40 flex justify-center items-start  `}
                    >
                        <p className="mt-16 text-sm font-medium font-sans text-gray-500 text-center">
                            You need to Train the model with your images before
                            entering the prompt
                        </p>
                    </div>
                )}
                <div className="w-max h-max flex justify-between items-center  mt-4 gap-2">
                    <Pen />
                    <h1 className="font-sans text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                        Describe how you want to be seen.
                    </h1>
                </div>
                <div
                    className="flex flex-row justify-center items-center h-max w-max mt-4 mb-1 font-sans cursor-pointer hover:border-b-[0.8px] hover: border-emerald-800"
                    onClick={() => {
                        setIsOpen(true)
                    }}
                >
                    <p className="text-xs my-0 py-0  bg-gradient-to-r from-emerald-800 to-sky-800 bg-clip-text text-transparent  font-medium ">
                        Learn how to write a good prompt for better results
                    </p>
                    <ChevronRight className="block text-sky-800" size={14} />
                </div>
                <div className="font-sans text-gray-500 font-medium text-xs mt-4">
                    <p>{`Your Trigger Word: ${triggerWord?triggerWord:""}`}</p>
                </div>
                <div
                    className={`mt-2 w-full z-10 relative ${trainingState === "succeeded" ? "" : "opacity-80 blur-[10px]"}`}
                >
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <textarea
                                id="promptInput"
                                placeholder="Enter your prompt"
                                className="w-full h-32 px-2 text-sm focus:outline-none resize-none placeholder:text-xs disabled:bg-white"
                                disabled={
                                    trainingState === "succeeded" ? false : true
                                }
                                onChange={(e) => {
                                    setPromptData({
                                        ...promptData,
                                        prompt: e.target.value,
                                    })
                                }}
                            />
                            {/*<div className="h-max w-max flex items-center justify-center gap-2 ">
                            <TextStarIcon />
                            <button
                                type="button"
                                onClick={() => {}}
                                className="text-[0.675rem] text-gray-400"
                                disabled={
                                    trainingState === "succeeded" ? false : true
                                }
                            >
                                Enhance Prompt
                            </button>
                        </div>*/}
                        </div>
                        <div className="flex justify-between h-max w-full mt-2 gap-4 ">
                            <div>
                                <label
                                    htmlFor="imagesInput"
                                    className="block  text-xs font-medium text-gray-700 font-sans"
                                >
                                    Number of Output Images
                                </label>
                                <p className="text-[0.675rem] text-gray-500 mb-2">
                                    {"(minimum: 1, maximum: 4)"}
                                </p>
                            </div>

                            <NumberInput
                                min={1}
                                max={4}
                                step={1}
                                initialValue={1}
                                disabled={
                                    trainingState === "succeeded" ? false : true
                                }
                                onChange={(value) =>
                                    setPromptData({
                                        ...promptData,
                                        images: value,
                                    })
                                }
                            />
                        </div>
                    </form>
                    <div className="w-full h-max flex justify-center mt-8">
                        <Button
                            className="w-4/5 bg-gradient-to-r from-pink-600 via-orange-600 to-purple-600 disabled:text-white"
                            disabled={
                                trainingState !== "succeeded" ||
                                generationStatus === "loading"
                            }
                            type="button"
                            onClick={handleSubmit}
                        >
                            {generationStatus === "loading"
                                ? "Generating..."
                                : "Generate ✨"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
