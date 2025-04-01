import { useImage } from "@/contexts/ImageContext"
import { useModel } from "@/contexts/ModelContext"
import { useNavigation as useBackNavigation } from "@/contexts/NavigationContext"
import { useSubscription } from "@/contexts/SubscriptionContext"
import { useUser } from "@/contexts/UserContext"

import {
    Clock,
    Coins,
    Minus,
    Layers as ModelIcon,
    Images as NumImage,
    Plus,
    Tags as CategoryIcon,
    AlertCircle
   
} from "lucide-react"
import { PiPants as PantsIcon,
    PiTShirt as ShirtIcon,
    PiDress as Dress } from "react-icons/pi"



import { useState } from "react"
import { Button } from "./UI/Button"
import ImageInputBox from "./ImageInputBox"
import { generateFashionImages } from "@/services/api/services"

function FashionModelForm() {
    const [numberOfImages, setNumberOfImages] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [clothesImages, setClothesImages] = useState([])
    const [modelImages, setModelImages] = useState([])
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

    const categories = [
        { id: "tops", label: "Top", icon: ShirtIcon },
        { id: "bottoms", label: "Bottom", icon: PantsIcon },
        { id: "one-pieces", label: "One Piece", icon: Dress },
    ]

    async function handleImageGeneration(
        formData,
        numImages
    ) {
        imageDispatch({
            type: "SET_GENERATION_STATUS",
            payload: {
                status: "generating",
                message: "Generating Fashion Model Images",
            },
        })
        console.log("Remaining Fashion Credits",subscription?.fashion_credits - numImages * 10)
        subscription?.fashion_credits &&
            updateFashionCredits(subscription?.fashion_credits - numImages * 10, user?.email)
    
        try {
            const data = await generateFashionImages(
              formData,
            )
            console.log("Fashion image generation response: ", data)
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
            console.log("error occured while generating fashion images")
            imageDispatch({
                type: "SET_GENERATION_STATUS",
                payload: {
                    status: "error",
                    message: "Error generating images",
                },
            })
            updateFashionCredits(error.data.remainingCredits, user?.email)
            console.log("Error generating images")
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
        console.log(clothesImages[0])
        console.log(modelImages[0])
        const formData = new FormData()
        formData.append("dressImg", clothesImages[0])
        formData.append("modelImg", modelImages[0])
        formData.append("category", selectedCategory)
        formData.append("userId", user.$id)
        formData.append("userEmail", user.email)
        formData.append("numberOfImages", numImages)

        await handleImageGeneration(
          formData,
            numImages,

        )

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
        <div className="w-full h-full mx-auto bg-white border-r-[1px] relative">
            <div className="h-[90%] w-full m-0 px-4 py-4 sm:overflow-y-scroll overflow-x-hidden">
                <div className="font-sans flex flex-col gap-1 h-max pb-6 border-b-[1px]">
                    <h1 className="font-sans w-max h-max font-semibold tracking-tight text-lg bg-clip-text bg-text-gradient text-transparent">
                        AI Fashion Try-On
                    </h1>
                    <p className="text-xs font-regular tracking-tight text-gray-500">
                        {
                            "Try on clothes virtually with our AI model."
                        }
                    </p>
                   
{subscription && subscription?.plan_name === 'Basic' && (
  <div className="mt-3 p-4 border border-orange-100 rounded-md bg-orange-50/50 ">
    <div className="flex items-center justify-center gap-3 ">
        <div className="">
        <AlertCircle size={20} className="text-orange-500" />
        </div>
       
      <p className="text-xs text-gray-600 leading-snug">
        You are currently on the Basic plan. Upgrade to the Pro plan to use this feature.
      </p>
    </div>
    <button className="mt-4 px-4 py-2 w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700  text-white text-xs font-medium rounded-md transition-colors"
    onClick={()=>window.location.href=`${import.meta.env.VITE_STRIPE_USER_PORTAL}`}
    >
      Upgrade Now
    </button>
  </div>
)}
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="mt-4"
                    id="fashion-model-form"
                >
                    <div className="flex flex-col h-max pb-2 mt-6 gap-1">
                        <div className="flex gap-2 w-max h-max text-gray-700 items-center justify-center">
                            <CategoryIcon size={16} />
                            <p className="block text-sm font-medium text-gray-700">
                                Select Clothing Category
                            </p>
                        </div>
                        <p className="text-[0.675rem] font-regular tracking-tight text-gray-500">
                            {"Choose a category for your fashion item"}
                        </p>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="relative group"
                                >
                                    <input
                                        type="radio"
                                        id={category.id}
                                        name="category"
                                        value={category.id}
                                        checked={
                                            selectedCategory === category.id
                                        }
                                        onChange={() =>
                                            setSelectedCategory(category.id)
                                        }
                                        className="absolute opacity-0 w-full h-full cursor-pointer z-10"
                                    />
                                    <label
                                        htmlFor={category.id}
                                        className={`block w-full py-3 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer text-center
                                        transform hover:-translate-y-1 bg-white
                                        ${
                                            selectedCategory === category.id
                                                ? "ring-2 ring-blue-500 ring-offset-2 opacity-100 scale-105 shadow-lg"
                                                : "drop-shadow-sm border-2 " +
                                                  (selectedCategory &&
                                                  selectedCategory !==
                                                      category.id
                                                      ? " opacity-40"
                                                      : " opacity-100")
                                        }`}
                                    >
                                        <div className="flex flex-col items-center justify-center">
                                            <category.icon className="h-5 w-5 mb-2 text-gray-700" />
                                            <h3 className="font-medium text-sm text-gray-700">
                                                {category.label}
                                            </h3>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                        {error.category && (
                            <p className="text-red-500 text-xs mt-1">
                                {error.category}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col h-max pb-2 mt-6 gap-1">
                        <div className="flex gap-2 w-max h-max text-gray-700 items-center justify-center">
                            <NumImage size={16} />
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Cloth Image
                            </label>
                        </div>
                        <p className="text-[0.675rem] font-regular tracking-tight text-gray-500">
                            {
                                "Upload images of the clothes you want to try on."

                            }
                            <br />
                            {"jpeg, png or wepb supported, max 5MB"}
                        </p>
                        <div className="mt-2">
                            <ImageInputBox
                                selectedImages={clothesImages}
                                setSelectedImages={setClothesImages}
                                maxImages={1}
                                id="clothes-images"
                            />
                            {error.clothesImages && (
                                <p className="text-red-500 text-xs mt-1">
                                    {error.clothesImages}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col h-max pb-2 mt-6 gap-1">
                        <div className="flex gap-2 w-max h-max text-gray-700 items-center justify-center">
                            <NumImage size={16} />
                            <label className="block text-sm font-medium text-gray-700">
                                Upload Model Image
                            </label>
                        </div>
                        <p className="text-[0.675rem] font-regular tracking-tight text-gray-500">
                            {"Upload image of fashion model or yourself to try on the clothes. Full body image is recommended."}
                            <br />
                            {"jpeg, png or wepb supported, max 5MB"}
                        </p>
                        <div className="mt-2">
                            <ImageInputBox
                                selectedImages={modelImages}
                                setSelectedImages={setModelImages}
                                maxImages={1}
                                id="model-images"
                            />
                            {error.modelImages && (
                                <p className="text-red-500 text-xs mt-1">
                                    {error.modelImages}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col h-max pb-2 mt-6 gap-1">
                        <div className="flex gap-2 w-max h-max text-gray-700 items-center justify-center">
                            <NumImage size={16} />
                            <label className="block text-sm font-medium text-gray-700">
                                Number of Images
                            </label>
                        </div>
                        <p className="text-[0.675rem] font-regular tracking-tight text-gray-500">
                            {"Number of images to generate (min: 1, max: 4)"}
                        </p>
                        <div className="relative mt-2 flex flex-nowrap border border-gray-300 rounded-md focus:border-slate-500">
                            <input
                                type="number"
                                required
                                value={numberOfImages}
                                disabled
                                min="1"
                                max="4"
                                className="px-3 py-2 block w-full focus:ring-slate-500 active:border-transparent focus:border-transparent rounded-md text-sm disabled:bg-white"
                            />
                            <div className="flex flex-col border-l border-gray-300 rounded-r-sm">
                                <button
                                    type="button"
                                    onClick={increment}
                                    className="flex items-center justify-center h-1/2 px-2 text-gray-500 hover:bg-gray-100 rounded-tr-sm"
                                >
                                    <Plus size={12} />
                                </button>
                                <button
                                    type="button"
                                    onClick={decrement}
                                    className="flex items-center justify-center h-1/2 px-2 text-gray-500 hover:bg-gray-100 border-t border-gray-300 rounded-br-sm"
                                >
                                    <Minus size={12} />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center text-sm mt-2 gap-1 text-gray-500">
                            <Coins size={12} />
                            <p>Credits - {numberOfImages * 10}</p>
                        </div>
                        {error.numberOfImages && (
                            <p className="text-red-500 text-xs mt-1">
                                {error.numberOfImages}
                            </p>
                        )}
                    </div>
                </form>
            </div>
            <div className="z-50 w-full bg-white h-[10%] fixed bottom-16 sm:bottom-0 sm:relative flex justify-center items-center border-t-[1px]">
                <Button
                    type="submit"
                    form="fashion-model-form"
                    className="w-2/3 text-xs sm:text-sm mx-auto bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500"
                    disabled={
                        subscription?.plan_name === 'Basic'||
                        imageState.generationStatus.status === "generating" ||
                        selectedCategory === "" ||
                        clothesImages.length === 0 ||
                        modelImages.length === 0 ||
                        numberOfImages === 0  
                    }
                >
                    <span>Generate Image</span>
                    <div className="flex items-center justify-center">
                        ~ ( <Clock size={12} />
                        <p>&nbsp;{numberOfImages * 15}s</p>)
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default FashionModelForm