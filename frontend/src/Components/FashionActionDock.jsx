import { useImage } from "@/contexts/ImageContext"
import { useNavigation as useBackNavigation } from "@/contexts/NavigationContext"
import { useSubscription } from "@/contexts/SubscriptionContext"
import { useUser } from "@/contexts/UserContext"
import FashionCategorySelector from "./FashionCategorySelector"
import NumberOfImages from "./NumberOfImages"
import GlowingAnimation from "./GlowingAnimation"
import UploadButton from "./UploadButton"
import { PiTShirtBold as ClothIcon } from "react-icons/pi";
import { FaPerson as ModelIcon} from "react-icons/fa6";

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

function FashionActionDock({dressImage, modelImage, setDressImage, setModelImage, className}) {

    const defaultCategory = "tops"
    const [numberOfImages, setNumberOfImages] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState(defaultCategory)
    const [error, setError] = useState({
        modelSelect: "",
        numberOfImages: "",
        category: "",
        dressImage: "",
        modelImages: "",
    })

    const { user } = useUser()
    const { dispatch: imageDispatch, state: imageState } = useImage()
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

    

    async function handleSubmit(e) {
        e.preventDefault()
        if (!validateForm()) return

        const numImages = parseInt(numberOfImages)
        console.log("dress Url:", URL.createObjectURL(dressImage))
        console.log("model Url:", URL.createObjectURL(modelImage))

        const formData = new FormData()
        formData.append("dressImg", dressImage)
        formData.append("modelImg", modelImage)
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
            dressImage: "",
            modelImages: "",
        }

        if (!selectedCategory) {
            newErrors.category = "Please select a clothing category"
            isValid = false
        }

        if (dressImage.length === 0) {
            newErrors.dressImage = "Please upload at least one clothes image"
            isValid = false
        }

        if (modelImage.length === 0) {
            newErrors.modelImages = "Please upload at least one model image"
            isValid = false
        }

        setError(newErrors)
        return isValid
    }

    return (
         <div className="w-11/12 max-w-3xl  left-1/2 -translate-x-1/2 h-max  fixed md:absolute bottom-4  z-50 ">
        <div className="w-full h-full relative">
            <div
                className="absolute left-1/2 -translate-x-1/2 -top-12 flex flex-row gap-4 w-max md:hidden "
            >
                <UploadButton setImage={setDressImage}
                    image={dressImage}
                    icon={<ClothIcon className="w-4 h-4" />}
                    text="Upload Clothes"
                    id='dress-image'
                />
                <UploadButton setImage={setModelImage}
                
                    image={modelImage}
                    icon={<ModelIcon className="w-4 h-4" />}
                    text="Upload Model"
                    id='model-image'
                />
            </div>
            {imageState?.generationStatus?.status === "generating" && <GlowingAnimation className="-z-10 absolute  h-full w-full   rounded-lg"/>}
           <div className="w-full h-full bg-white/85 backdrop-blur-lg border rounded-3xl px-4 py-3 shadow-md ">
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

                            <NumberOfImages
                                numberOfImages={numberOfImages}
                                setNumberOfImages={setNumberOfImages}
                            />
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
        </div>
        </div>
    )
}
export default FashionActionDock


 