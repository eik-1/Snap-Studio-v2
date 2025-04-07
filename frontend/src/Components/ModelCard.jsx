import { UserCircle2 } from "lucide-react"
function ModelCard({ model }) {
    return (
        <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-2xl border-[1px] p-6 flex flex-col justify-between">
            <div className="w-full h-max flex justify-between items-center">
                <div
                    className={` rounded-2xl p-2 ${model.status === "succeeded" ? "bg-emerald-50 text-emerald-500" : "bg-orange-50 text-orange-500"}`}
                >
                    <UserCircle2 size={24} />
                </div>
                <div>
                    <div
                        className={`rounded-full px-2 py-1 text-xs  text-white/90 ${model.status === "succeeded" ? "bg-emerald-500" : "bg-orange-500"}`}
                    >
                        {model.status === "succeeded" ? "Ready" : "Training"}
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-sm text-gray-500">{"Model Name"}</h2>
                <p className="sm:text-lg font-semibold">
                    {model.model_name || "Model Description"}
                </p>
            </div>
        </div>
    )
}
export default ModelCard
