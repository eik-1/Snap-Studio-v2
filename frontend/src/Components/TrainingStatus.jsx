import { useModel } from "@/contexts/ModelContext"
import { BellDot } from "lucide-react"
import NotificationButton from "./Notification"
function TrainingStatus() {
    const stateColor = {
        succeeded: "bg-green-500",
        error: "bg-red-500",
        progress: "bg-yellow-500",
    }

    const {
        state: modelState,
        dispatch: modelDispatch,
        currentTrainings,
    } = useModel()
    console.log(currentTrainings)

    return (
        <>
            {currentTrainings.length > 0 && (<>
                <div
                className="sm:hidden w-max h-full flex justify-center items-center mx-auto relative"
                >
                   <NotificationButton/>
                </div>
                <div
                    className={`hidden w-max h-full sm:flex justify-center items-center mx-auto relative `}
                >
                    <div
                        className={`w-max h-max flex items-center gap-2 text-gray-500  hover:text-gray-700  transition-all duration-200 cursor-pointer border-gray-100 `}
                    >
                        <div
                            className={`rounded-full h-[0.6rem] w-[0.6rem] bg-emerald-500 ${stateColor[modelState?.models?.status]} `}
                        ></div>
                        <div className="text-[0.675rem]">{`${currentTrainings.length} Model Training is succeeded`}</div>
                    </div>
                </div>
                </>
            )}
        </>
    )
}
export default TrainingStatus
