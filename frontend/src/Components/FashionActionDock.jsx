import { useImage } from "@/contexts/ImageContext"
import { useNavigation as useBackNavigation } from "@/contexts/NavigationContext"
import { useSubscription } from "@/contexts/SubscriptionContext"
import { useUser } from "@/contexts/UserContext"
import FashionCategorySelector from "./FashionCategorySelector"

import {
    Clock,
    Coins,
    Minus,
    Images as NumImage,
    Plus,
    Tags as CategoryIcon,
    AlertCircle,
} from "lucide-react"

import { useState } from "react"
import { Button } from "./UI/Button"

import { generateFashionImages } from "@/services/api/services"

function FashionActionDock({clothesImages, modelImages}) {

    const defaultCategory = "tops"
    const [numberOfImages, setNumberOfImages] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState(defaultCategory)
    const [error, setError] = useState({
        modelSelect: "",
        numberOfImages: "",
        category: "",
        clothesImages: "",
        modelImages: "",
    })

    const { user } = useUser()
    const { dispatch: imageDispatch, state: imageState } = useImage()
    const { dispatch: navDispatch } = useBackNavigation()
    const { updateFashionCredits, subscription } = useSubscription()


    async function handleImageGeneration(formData, numImages) {
        imageDispatch({
            type: "SET_GENERATION_STATUS",
            payload: {
                status: "generating",
                message: "Generating Fashion Model Images",
            },
        })

        subscription?.fashion_credits &&
            updateFashionCredits(
                subscription?.fashion_credits - numImages * 10,
                user?.email,
            )

        try {
            const data = await generateFashionImages(formData)

            imageDispatch({
                type: "SET_GENERATED_IMAGE_URLS",
                payload: data.imageUrls,
            })
            imageDispatch({
                type: "SET_GENERATION_STATUS",
                payload: {
                    status: "generated",
                    message: "Images generated successfully",
                },
            })
            updateFashionCredits(data.remainingCredits, user?.email)
        } catch (error) {
            imageDispatch({
                type: "SET_GENERATION_STATUS",
                payload: {
                    status: "error",
                    message: "Error generating images",
                },
            })
            updateFashionCredits(error.data.remainingCredits, user?.email)
        }
    }

    function increment() {
        if (numberOfImages < 4) {
            setNumberOfImages(numberOfImages + 1)
            setError({ ...error, numberOfImages: "" })
        } else {
            setError({ ...error, numberOfImages: "Maximum value is 4" })
        }
    }

    function decrement() {
        if (numberOfImages > 1) {
            setNumberOfImages(numberOfImages - 1)
            setError({ ...error, numberOfImages: "" })
        } else {
            setError({ ...error, numberOfImages: "Minimum value is 1" })
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!validateForm()) return

        const numImages = parseInt(numberOfImages)

        const formData = new FormData()
        formData.append("dressImg", clothesImages)
        formData.append("modelImg", modelImages)
        formData.append("category", selectedCategory)
        formData.append("userId", user.$id)
        formData.append("userEmail", user.email)
        formData.append("numberOfImages", numImages)

        await handleImageGeneration(formData, numImages)

        if (imageState.generationStatus.status === "success") {
        } else if (imageState.generationStatus.status === "error") {
            //handle error to be implemented
        }
    }

    function validateForm() {
        let isValid = true
        const newErrors = {
            modelSelect: "",
            numberOfImages: "",
            category: "",
            clothesImages: "",
            modelImages: "",
        }

        if (!selectedCategory) {
            newErrors.category = "Please select a clothing category"
            isValid = false
        }

        if (clothesImages.length === 0) {
            newErrors.clothesImages = "Please upload at least one clothes image"
            isValid = false
        }

        if (modelImages.length === 0) {
            newErrors.modelImages = "Please upload at least one model image"
            isValid = false
        }

        setError(newErrors)
        return isValid
    }

    return (
           <div className="w-11/12 z-50 left-1/2 -translate-x-1/2  bg-white/85 backdrop-blur-lg border rounded-3xl px-4 py-3 shadow-md absolute bottom-4 h-max">
            <form
                onSubmit={handleSubmit}
                id="custom-image-form"
                className="flex flex-col gap-3 "
            >
              
                <div className="flex items-center justify-between text-xs mt-1  text-gray-500">
                    <div className="flex w-max gap-4  ">
                        

                           <FashionCategorySelector
                               selectedCategory={selectedCategory}
                               setSelectedCategory={setSelectedCategory}
                           />

                            {/* Number of Images */}

                            <div className="w-24 h-10  p-1 flex-shrink-0 flex items-center justify-between  rounded-full bg-gray-100">
                                <button
                                    type="button"
                                    onClick={decrement}
                                    className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-[rgba(0,0,0,0.1)] rounded-full transition"
                                >
                                    <Minus size={12} />
                                </button>

                                <div className="text-sm font-medium text-gray-800">
                                    {numberOfImages}
                                </div>

                                <button
                                    type="button"
                                    onClick={increment}
                                    className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-[rgba(0,0,0,0.1)] rounded-full transition"
                                >
                                    <Plus size={12} />
                                </button>
                            </div>
                        </div>
               

                    {/* Generate Button */}
                    <div>
                        <Button
                            type="submit"
                            form="custom-image-form"
                            className="h-10 px-6 text-sm rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center gap-2"
                            disabled={
                                imageState.generationStatus.status ===
                                "generating"
                            }
                        >
                            <span>Generate</span>
                            <div className="flex items-center justify-center ml-2">
                                <Clock size={12} />
                                <p className="ml-1">{numberOfImages * 15}s</p>
                            </div>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default FashionActionDock


 