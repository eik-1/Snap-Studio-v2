import ModelCard from "@/Components/ModelCard"
import CreateNewModel from "@/Components/CreateNewMode"
import CustomImageModelTrainForm from "@/Components/CustomImageModelTrainForm"
import { useState } from "react"
import { useModel } from "@/contexts/ModelContext"

function MyModels() {
    const [isTrainingFormOpen, setIsTrainingFormOpen] = useState(false)
    const {state:modelState}= useModel()
    const filteredModels = modelState.models.filter(model=>model.status==="succeeded" || model.status==="processing" || model.status==="starting")

    return (
        <div className={`w-full h-full bg-white relative sm:flex  sm:flex-row md:items-center overflow-y-scroll sm:overflow-y-hidden `}>
            {isTrainingFormOpen
                 ? 
                 <div className="relative mb-12 sm:mb-0 sm:flex-shrink-0 h-max sm:h-full w-full sm:w-80 lg:w-[26rem] flex   bg-gray-200 overflow-hidden">
                 <div className="h-max sm:h-full relative bg-white  w-full flex z-10 top-0 border-r-[1px] overflow-y-auto">
                 <CustomImageModelTrainForm />
                 </div>
                 </div>:
            
            <div className="w-[95%] flex-shrink-0  mx-auto md:mx-0 h-36 md:h-[95%] md:my-auto md:w-80  border-b-[1px] md:border-r-[1px] md:border-b-0 border-neutral-200 md:border-b-none ">
                <div className="flex flex-col  items-center mt-10 md:mt-32 gap-2 ">
                    <h2 className="text-3xl leading-relaxed text-center font-semibold bg-clip-text text-transparent  bg-text-gradient">
                        My Models
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Explore your saved Models
                    </p>
                </div>
               
            </div> }

            <div className="sm:h-full pb-36 sm:pb-0 pt-8 px-4 sm:overflow-y-auto flex-grow">
                <div className="w-full flex flex-row flex-grow justify-center md:justify-start flex-wrap gap-4 md:gap-8 md:px-12 md:py-10">
                    <CreateNewModel onClick={()=>setIsTrainingFormOpen(true)} />
                    {filteredModels.map((model, index) => (
                        <ModelCard
                            key={index}
                           model={model}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default MyModels
