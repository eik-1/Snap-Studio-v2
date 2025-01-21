/* important this is an old component and is not in use*/

import React, { useState, useRef, useEffect, useCallback } from "react"
import JSZip from "jszip"
import axios from "axios"
import { Upload } from "lucide-react"
import { FadeLoader } from "react-spinners"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/UI/alert-dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/Components/UI/Button"
import { useUser } from "@/contexts/UserContext"
import { useImage } from "@/contexts/ImageContext"

function ModelTrainForm() {
    const [modelName, setModelName] = useState("")
    const [isDragging, setIsDragging] = useState(false)
    const [triggerWord, setTriggerWord] = useState("MOD")
    const [selectedFiles, setSelectedFiles] = useState([])
    const { user } = useUser()
    const { trainingState, setTrainingState } = useImage()
    const fileInputRef = useRef(null)
    let intervalId = null
    const data = {
        started: {
            heading: "Training Started",
            message:
                "Your model is being trained. This might take 15-20 minutes.",
            button: "Train New Model",
            handler: () => {
                setTrainingState("idle")
            },
        },
        succeeded: {
            heading: "Training Succeeded",
            message:
                "Your model has been trained successfully. You can now enter prompt and generate images. Don't forget to check the prompt writing guide for best results.",
            button: "Train New Model",
            handler: () => {
                setTrainingState("idle")
            },
        },
        failed: {
            heading: "Training Failed",
            message: "Your model training has failed. Please try again.",
            button: "Train Model Again",
            handler: () => {
                setTrainingState("idle")
            },
        },
        processing: {
            heading: "Training Started",
            message:
                "Your model is being trained. This might take 15-20 minutes.",
            button: "Train New Model",
            handler: () => {
                setTrainingState("idle")
            },
        },
        error: {
            heading: "Error",
            message: "Can't fetch training status. Please try again.",
            button: "Check Status Again",
            handler: () => {
                setTrainingState("loading")
                getTrainingStatus()
            },
        },
    }

    async function handleDeleteModel() {
        setTrainingState("idle")
        
    }
    const getTrainingStatus = useCallback(
        async function getTrainingStatus() {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/models/status`,
                    {
                        userId: user.$id,
                    },
                )
                if (response.data.status === 200) {
                    clearInterval(intervalId)
                    setTrainingState(response.data.data.trainingStatus)
                }
            } catch (err) {
                console.log(err)
                if (err.response?.data.status === 404) {
                    clearInterval(intervalId)
                    setTrainingState("idle")
                } else {
                    setTrainingState("idle")
                }
            }
        },
        [user.$id, setTrainingState, intervalId],
    )

    useEffect(() => {
        async function checkTrainingstatus() {
            await getTrainingStatus()
            console.log("Checking training status")
        }
        checkTrainingstatus()
    }, [getTrainingStatus, setTrainingState])

   

    function handleFileChange(e) {
        const files = Array.from(e.target.files)
        setSelectedFiles((prevFiles) => [...prevFiles, ...files])
    }
    function handleDragOver(e) {
        e.preventDefault()
        setIsDragging(true)
    }
    function handleDragLeave(e) {
        e.preventDefault()
        setIsDragging(false)
    }
    function handleDrop(e) {
        e.preventDefault()
        setIsDragging(false)
        const droppedImage = e.dataTransfer.files[0]
        setSelectedFiles((prevFiles) => [...prevFiles, droppedImage])
    }
    async function handleSubmit(e) {
        e.preventDefault()
        if (selectedFiles.length === 0) return

        const zip = new JSZip()
        selectedFiles.forEach((file) => {
            zip.file(file.name, file)
        })

        const zipBlob = await zip.generateAsync({ type: "blob" })

        const formData = new FormData()
        formData.append("file", zipBlob, "images.zip")
        formData.append("modelName", modelName)
        formData.append("triggerWord", triggerWord)
        formData.append("userId", user.$id)

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/models/train`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            )
            if (response.data.data.status === "starting") {
                setTrainingState("started")
                intervalId = setInterval(getTrainingStatus, 15000)
            } else if (response.data.data.status === "failed") {
                setTrainingState("failed")
            }
            console.log("Training started: ", response.data)
        } catch (err) {
            setTrainingState("failed")
            console.error("Error starting training: ", err)
        }
        setSelectedFiles([])
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const removeFile = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    }
    let content = null
    if (trainingState === "loading") {
        content = (
            <>
                <div className="w-full h-full mx-auto  bg-white border-r-[1px] relative">
                    <div className="h-[90%] max-w-sm m-0 px-4 py-4 overflow-y-scroll oveflow-x-hidden flex items-center justify-center">
                        <FadeLoader
                            loading={true}
                            height={15}
                            width={5}
                            radius={10}
                            color="#ff4600"
                        />
                    </div>
                    <div className="w-full h-[10%] flex justify-center items-center border-t-[1px]"></div>
                </div>
            </>
        )
    } else if (trainingState === "idle") {
        content = (
            <>
                 <div className="w-full h-full mx-auto  bg-white border-r-[1px] relative">
                    <div className="h-[90%] max-w-sm m-0 px-4 py-4 overflow-y-scroll oveflow-x-hidden">
                        <div className="font-sans flex flex-col gap-1 h-max pb-6 border-b-[1px] ">
                            <h1 className="font-sans font-semibold tracking-tighter text-lg text-purple-500">
                                Train Model
                            </h1>
                            <p className="text-xs font-regular tracking-tight text-gray-500">
                                Train a new model using your images. The model will be used to generate images based on the provided images. 
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="flex flex-col h-max pb-2">
                                <label className="block text-xs font-medium text-gray-700">
                                    Model Name
                                </label>
                                <p className="text-[0.575rem] font-regular tracking-tight text-gray-500">
                                    Pick a name for your model
                                </p>

                                <input
                                    type="text"
                                    value={modelName}
                                    onChange={(e) =>
                                        setModelName(e.target.value)
                                    }
                                    required
                                    className="px-3 py-2 mt-2 block w-full border border-gray-700 rounded-md  focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                                />
                            </div>
                            <div className="flex flex-col h-max pb-2 mt-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Trigger Word
                                </label>
                                <p className="text-[0.575rem] font-regular tracking-tight text-gray-500">
                                    Choose a trigger word for the model to
                                    generate images using the provided images.
                                    It should be a unique term that doesn't have
                                    any meaning in natural language.
                                </p>
                                <input
                                    type="text"
                                    value={triggerWord}
                                    onChange={(e) =>
                                        setTriggerWord(e.target.value)
                                    }
                                    className="px-3 py-2 mt-2 block w-full border border-gray-700 rounded-md  focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                                />
                            </div>
                            <div className="flex flex-col h-max pb-2 mt-1">
                                <p className="block text-sm font-medium text-gray-700">
                                    Upload Images
                                </p>
                                <p className="text-[0.675rem] font-regular tracking-tight text-gray-500">
                                    For the best results, upload at least 5
                                    images of yourself from different angles and
                                    poses.
                                </p>
                            </div>
                            <div
                                className={`w-full h-32 mx-auto border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">
                                    Drag your file(s) or{" "}
                                    <label
                                        htmlFor="images"
                                        className="text-blue-500 cursor-pointer"
                                    >
                                        browse
                                        <input
                                            type="file"
                                            id="images"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            multiple
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </label>
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2 py-2">
                                    Selected images: {selectedFiles.length}
                                </p>
                                <div className="max-h-28 grid grid-cols-3 gap-2 ">
                                    {selectedFiles.map((file, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-24 object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFile(index)
                                                }
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="w-full h-[10%] flex justify-center items-center border-t-[1px]">
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={
                                selectedFiles.length === 0 && modelName === ""
                            }
                            className="w-2/3 mx-auto"
                        >
                            Train Model
                        </Button>
                    </div>
                </div>
            </>
        )
    } else
        content = (
            <>
                 <div className="w-full h-full mx-auto  bg-white border-r-[1px] relative">
                    <div className="h-[90%] max-w-sm m-0 px-4 py-4 overflow-y-scroll oveflow-x-hidden">
                        <div className="font-sans flex flex-col gap-1 h-max pb-6 border-b-[1px] ">
                            <h1
                                className={cn(
                                    `font-sans font-semibold tracking-tighter text-xl text-gray-800 ${trainingState === "error" && "text-red-500"} ${trainingState === "succeeded" && "text-emerald-600"}`,
                                )}
                            >
                                {data[trainingState]?.heading}
                            </h1>
                            <p className="text-sm font-regular tracking-tight text-gray-500">
                                {data[trainingState]?.message}
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-[10%] flex justify-center items-center border-t-[1px]">
                        {trainingState === "succeeded" ? (
                            <>
                                <AlertDialog>
                                    <AlertDialogTrigger className="w-full">
                                        <Button className="w-2/3 mx-auto">
                                            Train New Model
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Training New Model
                                            </AlertDialogTitle>
                                            <AlertDialogDescription className="text-red-700">
                                                Training a new model will
                                                overwrite the existing model.
                                                Are you sure you want to
                                                continue?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDeleteModel}
                                            >
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </>
                        ) : (
                            <>
                                <Button
                                    type="button"
                                    onClick={data[trainingState].handler}
                                    className="w-2/3 mx-auto"
                                    disabled={trainingState === "started"}
                                >
                                    {data[trainingState]?.button}
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </>
        )

    return content
}

export default ModelTrainForm
