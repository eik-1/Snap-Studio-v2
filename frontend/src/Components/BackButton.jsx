import { useNavigate, useLocation } from "react-router-dom";
import {
    ArrowLeft
} from "lucide-react"
function BackButton()
{
    const navigate = useNavigate();
    const location = useLocation(); 
    const handleBack= ()=>{
        navigate(-1);
    }
    
    return(
        <div className={`${location.pathname === "/app" ? "hidden" : "block"} relative h-max w-max bg-white/80 backdrop-blur-md border shadow-sm hover:shadow-md  rounded-full p-2  text-black/80 hover:text-black cursor-pointer transition-all duration-75`}
        onClick={handleBack}
        role="button"
        
        >
            <ArrowLeft 
                className="h-3 w-3 sm:h-4 sm:w-4" 
         
            />
        </div>
    )
}
export default BackButton;