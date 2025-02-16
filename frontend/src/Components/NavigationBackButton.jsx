import { useNavigation } from "@/contexts/NavigationContext"
import { CircleArrowLeft } from "lucide-react"
import { useLocation } from "react-router-dom"
const data = {
    options: "select options",
    headshot: "Generate Headshot",
    customImage: "Generate Image",
    fashionModel: "Generate Fashion Model",
}
function NavigationBackButton() {
    const { state, dispatch } = useNavigation()
    const location = useLocation()
    return (
        <>
            {state.tabs[state.tabs.length - 1] !== "options" &&
                location.pathname === "/app" && (
                    <div className="px-2">
                        <button
                            className="flex items-center   space-x-1  text-xs text-neutral-600 hover:text-neutral-900 transition-colors duration-100"
                            onClick={() =>
                                dispatch({
                                    type: "REMOVE_TAB",
                                }) 
                            }
                        >
                            <CircleArrowLeft size={14} />
                            <span className="text-left ">{`Back to ${data[state.previousTab]} `}</span>
                        </button>
                    </div>
                )}
        </>
    )
}
export default NavigationBackButton
