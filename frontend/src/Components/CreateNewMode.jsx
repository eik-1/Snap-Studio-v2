import { Plus } from "lucide-react"
function CreateNewModel({model, onClick})
{
    return(
        <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-2xl border-[1px] p-6 flex flex-col justify-center items-center hover:shadow-md group transition-all duration-300 cursor-pointer"
        role="button"
        onClick={onClick}
        >
      <div className="w-full h-max flex flex-col justify-center items-center gap-4">
        <div className="rounded-2xl p-2 bg-purple-50 text-purple-500 group-hover:bg-purple-100 group-hover:scale-105 transition-all duration-300">

            <Plus size={24} />
        </div>
        <p>Train New model</p>

      </div>

    </div>
    )
}
export default CreateNewModel