import {useState} from "react"
import ImageInputBox from "@/Components/ImageInputBox"
import { Button } from "@/Components/UI/Button"
import { customImageTrainingField } from "@/data/formFields";
  
function CustomImageModelTrainForm() {

    
    const initialState={
        modelName: "",
        triggerWord:"",
        gender:"",
        ethnicity:"",
        
    }
    const [formData, setFormData] = useState(initialState);
    const [selectedImages, setSelectedImages] = useState([])

    function handleChange(e)
    {
        const {name, value}= e.target;
        setFormData({
            ...formData,
            [name]:value
        })

    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        setSelectedImages([])
        setFormData(initialState)
    }
  
    return (
        <div className="w-full h-full mx-auto  bg-white border-r-[1px] relative">
            <div className="h-[90%] max-w-sm m-0 px-4 py-4 overflow-y-scroll oveflow-x-hidden custom-scrollbar">
                <div className="font-sans flex flex-col gap-1 h-max pb-6 border-b-[1px] ">
                    <h1 className="font-sans font-medium tracking-tight text-lg text-purple-500">
                        Train Model
                    </h1>
                    <p className="text-xs font-regular tracking-tight text-gray-500">
                        Train a new model using your images. The model will be
                        used to generate images based on the provided images.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-4">
                    {customImageTrainingField.map((field, index)=>{
                        return(
                            <div key={index} className="flex flex-col h-max pb-2 mt-3">
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                <p className="text-[0.575rem] font-regular tracking-tight text-gray-500">
                                    {field.description}
                                </p>
                              {field.name!=="uploadImages" &&  <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                   onChange={handleChange}
                                    className="px-3 py-2 mt-2 block w-full border border-gray-700 rounded-md  focus:ring-slate-500 focus:border-slate-500 text-sm"
                                />}
                            </div>
                        )
                    })}
                    <ImageInputBox
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                    />
                    
                    
                </form>
            </div>
            <div className="w-full h-[10%] flex justify-center items-center border-t-[1px]">
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


                  