import ImageInputBox from "@/Components/ImageInputBox"
import { Button } from "@/Components/UI/Button"
import { useModel } from "@/contexts/ModelContext"
import { useUser } from "@/contexts/UserContext"
import { customImageTrainingField } from "@/data/formData"
import { imagesToZipBlob } from "@/services/utils/zipUtils"
import { useState } from "react"

function CustomImageModelTrainForm() {
    const {
        state: modelState,
        dispatch: modelDispatch,
        startModelTraining,
    } = useModel()
    const initialState = {
        modelName: "",
        triggerWord: "",
        gender: "",
        ethnicity: "",
    }
    const [formDataValues, setFormDataValues] = useState(initialState)
    const [selectedImages, setSelectedImages] = useState([])

    const { user } = useUser()

    function handleChange(e) {
        const { name, value } = e.target
        setFormDataValues({
            ...formDataValues,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formDataValues)
        try {
            const zipBlob = await imagesToZipBlob(selectedImages)
            const formData = new FormData()
            formData.append("file", zipBlob, "images.zip")
            for (const [key, value] of Object.entries(formDataValues)) {
                formData.append(key, value)
            }
            formData.append("userId", user.$id)
            formData.append("userEmail", user.email)
            const response = await startModelTraining(formData)
            console.log(response)
            if (response.status === 200) {
                console.log("Model Training Started")

                modelDispatch({
                    type: "ADD_MODEL",
                    payload: response.data.modelData,
                })
            } else {
                console.log("Model Training Failed")
            }
        } catch (error) {
            console.log(error)
        }

        setSelectedImages([])
        setFormDataValues(initialState)
    }

    return (
        <div className="w-full h-full mx-auto  bg-white border-r-[1px] relative">
            <div className="h-[90%] w-full m-0 px-4 py-4  sm:overflow-y-scroll oveflow-x-hidden">
                <div className="font-sans flex flex-col gap-1 h-max pb-6 border-b-[1px] ">
                    <h1 className="font-sans w-max h-max font-semibold tracking-tight text-lg bg-clip-text from-rose-500 via-purple-500 to-cyan-500 bg-gradient-to-r text-transparent">
                        Train Model
                    </h1>
                    <p className="text-xs font-regular tracking-tight text-gray-500">
                        Train a new model using your images. The model will be
                        used to generate images based on the provided images.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-4">
                    {customImageTrainingField.map((field, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col h-max w-full  mt-6 pb-2 gap-1 "
                            >
                                <div className="flex gap-2 w-max h-max text-gray-700  items-center justify-center">
                                    {field.Icon}
                                    <label className="block text-sm font-medium text-gray-700 leading-none">
                                        {field.label}
                                    </label>
                                </div>

                                <p className="text-[0.675rem]  tracking-tight text-gray-500">
                                    {field.description}
                                </p>
                                {field.name !== "uploadImages" && (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formDataValues[field.name]}
                                        onChange={handleChange}
                                        className="px-3 py-2 mt-2  block w-full border border-gray-300 rounded-md  focus:ring-slate-500 focus:border-slate-500 text-sm"
                                    />
                                )}
                            </div>
                        )
                    })}
                    <ImageInputBox
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                    />
                </form>
            </div>
            <div className="w-full bg-white h-[10%]  fixed bottom-16 sm:bottom-0 sm:relative flex justify-center items-center border-t-[1px]">
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={selectedImages.length === 0}
                    className="w-2/3 mx-auto"
                >
                    Train Model
                </Button>
            </div>
        </div>
    )
}
export default CustomImageModelTrainForm
