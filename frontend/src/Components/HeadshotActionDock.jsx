import { useImage } from "@/contexts/ImageContext"
import { useModel } from "@/contexts/ModelContext"
import { useNavigation as useBackNavigation } from "@/contexts/NavigationContext"
import { useSubscription } from "@/contexts/SubscriptionContext"
import { useUser } from "@/contexts/UserContext"
import { headshotStyles } from "@/data/formData"
import { generateHeadshot } from "@/services/api/services"
import {
    Clock,
    Coins,
    Minus,
    Layers as ModelIcon,
    Images as NumImage,
    Plus,
    SquareUserRound as StyleIcon,
    
} from "lucide-react"
import { useState } from "react"
import { Button } from "./UI/Button"
import AvatarDropdown from "./AvatarDropdown"
import { toast } from "sonner"

function HeadshotActionDock({selectedStyle, setSelectedStyle}) {
      const [selectedModel, setSelectedModel] = useState("")
      const [numberOfImages, setNumberOfImages] = useState(1) 
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
      const trainedModels = modelState.models.filter(
          (model) => model.status === "succeeded",
      )
  
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
              payload: { status: "generating", message: "Generating Images", numberOfImages: numImages },
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
                  type: "SET_GENERATED_HEADSHOT_URLS",
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
             error?.data?.remainingCredits && updateCredits(error.data.remainingCredits, user?.email)
              toast.error("Error generating images, please try again")
              
          }
      }
      function increment() {
          if (numberOfImages < 4) {
              setNumberOfImages(numberOfImages + 1)
              setError({ numberOfImages: "" })
          } else {
              setError({ numberOfImages: "Maximum value is 5" })
          }
      }
  
      function decrement() {
          if (numberOfImages > 1) {
              setNumberOfImages(numberOfImages - 1)
              setError({ numberOfImages: "" })
          } else {
              setError({ numberOfImages: "Minimum value is 1" })
          }
      }
      async function handleSubmit(e) {
          e.preventDefault()
          /*New Changes*/
          if (!validateForm(e)) return
          const numImages = parseInt(numberOfImages)
          // handle > 5 images
          
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
  
      /*New Changes*/
      function validateForm() {
          if (!selectedModel) {
              setError({
                  ...error,
                  modelSelect: "Please select a model to generate headshots",
              })
              return false
          }
          return true
      }

    return (
        <div className="w-11/12 z-50 left-1/2 -translate-x-1/2  bg-white/85 backdrop-blur-lg border rounded-3xl px-4 py-3 shadow-md absolute bottom-4 h-max">
            <form
                onSubmit={handleSubmit}
                id="custom-image-form"
                className="flex flex-col gap-3 "
            >
              
                <div className="flex items-center justify-between text-xs mt-1  text-gray-500">
                    <div className="flex gap-4 ">
                        {/* Model Selection */}
                       
                            <AvatarDropdown
                                trainedModels={trainedModels}
                                selectedModel={selectedModel}
                                setSelectedModel={setSelectedModel}
                                error={error}
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
export default HeadshotActionDock
