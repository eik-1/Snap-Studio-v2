import {useImage} from "@/contexts/ImageContext"
import { CircleArrowLeft } from "lucide-react"
import { useLocation } from "react-router-dom"
function Header() {
  
    const {state, dispatch} = useImage();
    const location = useLocation();
    return (
        <header className="flex h-[2.5rem] w-full  bg-white border-[1px] fixed top-0 z-50">
          
           
            
            <div className="flex items-center space-x-3">
             {state.mode !== "none" && location.pathname === "/app" &&
             <div className="px-2">
                <button className="flex items-center   space-x-1  text-xs text-neutral-600 hover:text-purple-500 transition-colors duration-100" onClick={()=>dispatch({type:"SET_MODE", payload:"none"})}>
                    <CircleArrowLeft size={14} />
                    <span >Back to options</span>
                </button>
             </div>
}   
             
            </div>
        </header>
    )
}

export default Header
