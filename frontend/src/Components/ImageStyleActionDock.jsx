import { useImage } from "@/contexts/ImageContext"
import { useSubscription } from "@/contexts/SubscriptionContext"
import { useUser } from "@/contexts/UserContext"
import { generateStyleImage } from "@/services/api/services"
import { IoIosPerson as StyleIcon } from "react-icons/io"
import ImageStyleImageUpload from "./ImageStyleImageUpload"

import { Clock, Coins, SwitchCamera as ChangeIcon } from "lucide-react"
import { useState } from "react"
import GlowingAnimation from "./GlowingAnimation"
import NumberOfImages from "./NumberOfImages"
import { toast } from "sonner"

function ImageStyleActionDock({
    selectedStyle,
    setSelectedStyle,
    isDrawerOpen,
    setIsDrawerOpen,
}) {
    const [numberOfImages, setNumberOfImages] = useState(1)
    const [error, setError] = useState({
        modelSelect: "",
        numberOfImages: "",
        style: "",
    })
    const [uploadedImage, setUploadedImage] = useState(null)

    const { user } = useUser()
    const { dispatch: imageDispatch, state: imageState } = useImage()
    const { updateCredits, subscription } = useSubscription()

    /* const { data: fetchedModels = [] } = useQuery({
          queryKey: ["models", user],
          queryFn: () => getUserModels(user.$id),
      })*/
    async function handleImageGeneration(formData) {
        imageDispatch({
            type: "SET_GENERATION_STATUS",
            payload: {
                status: "generating",
                message: "Generating Images",
                numberOfImages: numberOfImages,
            },
        })
        subscription?.credits &&
            updateCredits(
                subscription?.credits - numberOfImages * 10,
                user?.email,
            )
        try {
            const data = await generateStyleImage(formData)
            console.log("Generated Image URLs:", data.imageUrls)
            imageDispatch({
                type: "SET_GENERATED_IMAGE_URLS",
                payload: data.imageUrls,
            })
            imageDispatch({
                type: "SET_GENERATED_STYLE_URLS",
                payload: data.imageUrls,
            })
            imageDispatch({
                type: "SET_GENERATION_STATUS",
                payload: {
                    status: "generated",
                    message: "Images generated successfully",
                    numberOfImages: numberOfImages,
                },
            })
            updateCredits(data.remainingCredits, user?.email)
        } catch (error) {
            imageDispatch({
                type: "SET_GENERATION_STATUS",
                payload: {
                    status: "error",
                    message: "Error generating images",
                    numberOfImages: numberOfImages,
                },
            })
            error?.data?.remainingCredits &&
                updateCredits(error.data.remainingCredits, user?.email)
            toast.error("Error generating images, please try again")
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        /*New Changes*/
        if (!validateForm(e)) return
        const numImages = parseInt(numberOfImages)
        // handle > 5 images
        console.log("Selected Style:", selectedStyle)
        console.log("Number of Images:", numImages)
        const formData = new FormData()
        formData.append("userId", user.$id)
        formData.append("style", selectedStyle)
        formData.append("numImages", numImages)
        formData.append("email", user.email)
        if (uploadedImage) {
            formData.append("image", uploadedImage)
        }
        await handleImageGeneration(formData)
        if (imageState.generationStatus.status === "success") {
            //reset form state or just leave it as it is
        } else if (imageState.generationStatus.status === "error") {
            //handle error  to be implemented
        }
    }

    /*New Changes*/
    function validateForm() {
        if (!uploadedImage) {
            setError({
                ...error,
                image: "Please upload an image to generate styles",
            })
            toast.error("Please upload an image to generate styles")
            return false
        }
        if (!selectedStyle) {
            setError({
                ...error,
                style: "Please select a style to generate styles",
            })
            toast.error("Please select a style to generate styles")
            return false
        }
        return true
    }
    const handleImageUpload = (file) => {
        setUploadedImage(file)
    }

    const handleRemoveImage = () => {
        setUploadedImage(null)
    }
    return (
        <>
            <div className="w-11/12 max-w-3xl  left-1/2 -translate-x-1/2 h-max  fixed md:absolute bottom-4  z-50 ">
                <div className="w-full h-full relative">
                    <button
                        key="expand-button"
                        onClick={() => setIsDrawerOpen(true)}
                        className="absolute left-1/2 -translate-x-1/2 -top-12  bg-white/90 backdrop-blur-lg border  rounded-3xl px-4 py-2 shadow-sm hover:bg-white transition-all duration-200 hover:shadow-lg flex items-center justify-center md:hidden gap-1"
                        aria-label="Expand Drawer"
                    >
                        {selectedStyle ? (
                            <ChangeIcon className="text-gray-600" size={18} />
                        ) : (
                            <StyleIcon className="text-gray-600" size={18} />
                        )}
                        <div className="text-xs text-gray-600">
                            {selectedStyle ? "Change Style" : "Select Style"}
                        </div>
                    </button>
                    {imageState?.generationStatus?.status === "generating" && (
                        <GlowingAnimation className="-z-10 absolute  h-full w-full   rounded-lg" />
                    )}
                    <div className="w-full h-full bg-white/90 backdrop-blur-lg border rounded-3xl px-4 py-3 shadow-md ">
                        {uploadedImage && (
                            <div className="absolute left-4 top-4 sm:-top-8">
                                <div className="w-16 h-16 sm:h-24 sm:w-24 rounded-xl overflow-hidden border border-gray-200   bg-white p-1 shadow-md">
                                    <img
                                        src={URL.createObjectURL(uploadedImage)}
                                        alt="Uploaded"
                                        className="w-full h-full object-cover rounded-[11px]   "
                                    />
                                </div>
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            id="custom-image-form"
                            className="flex flex-col gap-3 "
                        >
                            <ImageStyleImageUpload
                                uploadedImage={uploadedImage}
                                onImageUpload={handleImageUpload}
                                onRemoveImage={handleRemoveImage}
                            />
                            <div className="flex flex-col gap-4 sm:gap-4 sm:flex-row sm:items-center sm:flex-wrap sm:justify-between text-xs mt-1 text-gray-500">
                                <div className="flex gap-4 justify-center sm:justify-start ">
                                    {/* Model Selection */}

                                    {/* Number of Images */}

                                    <NumberOfImages
                                        numberOfImages={numberOfImages}
                                        setNumberOfImages={setNumberOfImages}
                                    />
                                    <div className="flex items-center justify-center gap-1">
                                        <Coins className="w-4 h-4"></Coins>
                                        <p>{numberOfImages * 10}</p>
                                    </div>
                                </div>

                                {/* Generate Button */}
                                <div className="flex">
                                    <button
                                        type="submit"
                                        form="custom-image-form"
                                        className="w-full sm:w-max h-10 px-6 gap-2 flex items-center justify-center  text-sm rounded-full sm:rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white "
                                        disabled={
                                            imageState.generationStatus
                                                .status === "generating"
                                        }
                                    >
                                        <span className="">Generate</span>
                                        <div className="flex items-center justify-center ml-2">
                                            <Clock size={12} />
                                            <p className="ml-1">
                                                {numberOfImages * 15}s
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ImageStyleActionDock
