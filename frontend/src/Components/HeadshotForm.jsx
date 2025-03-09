import { useImage } from "@/contexts/ImageContext"
import { useModel } from "@/contexts/ModelContext"
import { useNavigation as useBackNavigation } from "@/contexts/NavigationContext"
import { useSubscription } from "@/contexts/SubscriptionContext"
import { useUser } from "@/contexts/UserContext"
import { headshotStyles } from "@/data/formData"
import { generateHeadshot } from "@/services/api/services"
import {
    Coins,
    Layers as ModelIcon,
    Images as NumImage,
    SquareUserRound as StyleIcon,
} from "lucide-react"
import { useState } from "react"
import { Button } from "./UI/Button"

function HeadshotForm() {
    const [selectedModel, setSelectedModel] = useState("")
    const [numberOfImages, setNumberOfImages] = useState(1)
    const [selectedStyle, setSelectedStyle] = useState(null)
    const [error, setError] = useState({
        modelSelect: "",
        numberOfImages: "",
        style: "",
    })

    const { user } = useUser()
    const { dispatch: imageDispatch, state: imageState } = useImage()
    const { dispatch: navDispatch } = useBackNavigation()
    const { state: modelState } = useModel()
    const { updateCredits, subscription } = useSubscription()

    /* const { data: fetchedModels = [] } = useQuery({
        queryKey: ["models", user],
        queryFn: () => getUserModels(user.$id),
    })*/
    async function handleImageGeneration(
        userId,
        modelName,
        style,
        numImages,
        email,
    ) {
        imageDispatch({
            type: "SET_GENERATION_STATUS",
            payload: { status: "generating", message: "Generating Images" },
        })
        subscription?.credits &&
            updateCredits(subscription?.credits - numImages * 10, user?.email)
        try {
            const data = await generateHeadshot(
                userId,
                modelName,
                numImages,
                style,
                email,
            )
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
            updateCredits(data.remainingCredits, user?.email)
        } catch (error) {
            imageDispatch({
                type: "SET_GENERATION_STATUS",
                payload: {
                    status: "error",
                    message: "Error generating images",
                },
            })
            updateCredits(error.data.remainingCredits, user?.email)
            console.log("Error generating images")
        }
    }
    async function handleSubmit(e) {
        e.preventDefault()
        //if (!validateForm(e)) return
        const numImages = parseInt(numberOfImages)
        // handle > 5 images
        console.log(selectedModel)
        await handleImageGeneration(
            user.$id,
            selectedModel,
            selectedStyle,
            numImages,
            user.email,
        )
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
  /*  function validateForm(e)
    {
        if (!selectedModel) {                    // check if model is selected
            const selectElement = e.target.querySelector("select");
            selectElement.setCustomValidity("Please select a model.");
            selectElement.reportValidity();
            return false
        }
        return true;
    }*/
    function handleNumberOfImagesChange(e) {
        if (e.target.value > 5) {
            setError({
                ...error,
                numberOfImages: "Number of images should be less than 5",
            })
        } else {
            setError({ ...error, numberOfImages: "" })
        }
        setNumberOfImages(e.target.value)
    }
    return (
        <div className="w-full h-full mx-auto  bg-white border-r-[1px] relative">
            <div className="h-[90%] w-full m-0 px-4 py-4 sm:overflow-y-scroll oveflow-x-hidden">
                <div className="font-sans flex flex-col gap-1 h-max pb-6 border-b-[1px] ">
                    <h1 className="font-sans w-max h-max font-semibold tracking-tight text-lg bg-clip-text from-rose-500 via-purple-500 to-cyan-500 bg-gradient-to-r text-transparent">
                        Generate Headshot
                    </h1>
                    <p className="text-xs font-regular tracking-tight text-gray-500">
                        {
                            "Generate professional headshots using your trained models"
                        }
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="mt-4"
                    id="headshot-form"
                >
                    <div className="flex flex-col h-max  mt-3 pb-2 gap-1">
                        <div className="flex gap-2 w-max h-max text-gray-700  items-center justify-center">
                            <ModelIcon size={16} />
                            <label className="block text-sm font-medium text-gray-700 leading-none">
                                Select Model
                            </label>
                        </div>
                        <p className="text-[0.675rem] font-regular tracking-tight text-gray-500">
                            Choose from your trained models
                        </p>
                        <select
        
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            className={`px-3 py-2 mt-2 block w-full  border border-gray-300 rounded-md  focus:ring-slate-500 focus:border-slate-500 text-xs ${modelState?.models?.length === 0 && "cursor-not-allowed"} `}
                            disabled={modelState?.models?.length === 0}
                        >
                            <option value="" disabled >
                                {modelState?.models?.length === 0
                                    ? "No trained models"
                                    : "Select Model"}
                            </option>

                            {modelState?.models?.map((model, index) => (
                                <option key={index} value={model.model_name}>
                                    {model.model_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex">
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
                    <div className="flex flex-col h-max pb-2 mt-10 gap-1">
                        <div className="flex gap-2 w-max h-max text-gray-700  items-center justify-center">
                            <NumImage size={16} />
                            <label className="block text-sm font-medium text-gray-700">
                                Number of Headshots
                            </label>
                        </div>
                        <p className="text-[0.675rem] font-regular tracking-tight text-gray-500">
                            {"Number of images to generate (min: 1, max: 5)"}
                        </p>
                        <input
                            type="number"
                            required
                            value={numberOfImages}
                            onChange={handleNumberOfImagesChange}
                            min="1"
                            max="5"
                            className="px-3 py-2 mt-2 block w-full border border-gray-300 rounded-md  focus:ring-slate-500 focus:border-slate-500 text-sm"
                        />
                        <p className="text-[0.675rem] font-regular tracking-tight text-red-500">
                            {error.numberOfImages}{" "}
                        </p>
                    </div>
                    <div className="flex flex-col h-max pb-2 mt-6 gap-1">
                        <div className="flex gap-2 w-max h-max text-gray-700  items-center justify-center">
                            <StyleIcon size={16} />
                            <p className="block text-sm font-medium text-gray-700">
                                Select Headshot Style
                            </p>
                        </div>
                        <p className="text-[0.675rem] font-regular tracking-tight text-gray-500">
                            {"Choose a style for your headshot"}
                        </p>
                        <div className="grid grid-cols-[repeat(auto-fit,_minmax(6rem,_1fr))] justify-items-center  gap-4 mt-4">
                            {headshotStyles.map((style) => (
                                <div key={style.id} className="relative group">
                                    <input
                                        type="radio"
                                        required
                                        id={style.id}
                                        name="headshotStyle"
                                        value={style.id}
                                        checked={selectedStyle === style.id}
                                        onClick={(e) =>
                                            selectedStyle === style.id
                                                ? setSelectedStyle(null)
                                                : setSelectedStyle(style.id)
                                        }
                                        className="absolute opacity-0 w-full h-full cursor-pointer z-10"
                                    />
                                    <label
                                        htmlFor={style.id}
                                        className={`block w-28  rounded-xl overflow-hidden transition-all duration-300 cursor-pointer
                transform hover:-translate-y-1 bg-white
                ${
                    selectedStyle === style.id
                        ? "ring-2 ring-blue-500 ring-offset-4 opacity-100 scale-105 shadow-lg"
                        : "drop-shadow-sm border-2 " +
                          (selectedStyle && selectedStyle !== style.id
                              ? " opacity-40"
                              : " opacity-100")
                }`}
                                    >
                                        <div className="w-28 h-28 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10" />
                                            <img
                                                src={style.image}
                                                alt={style.label}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            {selectedStyle === style.id && (
                                                <div className="absolute top-2 right-2 z-20 bg-blue-500 rounded-full p-1.5">
                                                    <svg
                                                        className="w-3 h-3 text-white"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={3}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-2  flex justify-center items-center">
                                            <h3 className="font-normal text-[0.675rem] text-gray-700 ">
                                                {style.label}
                                            </h3>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </div>
            <div className="z-50 w-full bg-white h-[10%]  fixed bottom-16 sm:bottom-0 sm:relative flex justify-center items-center border-t-[1px]">
                <Button
                    type="submit"
                    form="headshot-form"
                    className="w-2/3 text-xs sm:text-sm mx-auto bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500 "
                    disabled={
                        imageState.generationStatus.status === "generating"
                    }
                >
                    <span>Generate Headshot</span>
                    <div className="flex items-center justify-center ">
                        ~ ( <p>{numberOfImages * 10}</p>
                        <Coins />)
                    </div>
                </Button>
            </div>
        </div>
    )
}
export default HeadshotForm
