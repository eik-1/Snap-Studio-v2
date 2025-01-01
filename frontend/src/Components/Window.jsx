
import { useEffect, useState } from "react";


const  Window = ({children, title="SnapStudio", link})=>{
    const [isMobile, setIsMobile] = useState(false);
     useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
        window.addEventListener("resize", () => {
            if (window.innerWidth < 1024) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        });
     },[setIsMobile])
    return (
        
        <div className="relative h-[16rem] w-full sm:h-[30rem] sm:w-[56rem] mx-auto rounded-lg sm:rounded-2xl border-[1px] p-0 shadow-xl mt-28">
            <div className="absolute h-full w-full top-0 z-10 bg-gradient-to-r from-violet-100 via-fuchsia-200  to-orange-100 blur-[80px]"></div>
            <div className="absolute h-[6%] min-w-full bg-white flex items-center px-2 rounded-t-lg sm:rounded-t-2xl border-b-[1px] z-30 s:drop-shadow-sm">
                <div className="w-max h-max flex gap-1 sm:gap-2 mr-auto">
                        <div className="rounded-full bg-red-400 h-1 w-1 sm:h-3 sm:w-3 sm:border-red-500 sm:border-[1px]"></div>
                        <div className="rounded-full bg-yellow-400 h-1 w-1 sm:h-3 sm:w-3 sm:border-yellow-500 sm:border-[1px]"></div>
                        <div className="rounded-full bg-green-400 h-1 w-1 sm:h-3 sm:w-3 sm:border-green-500 sm:border-[1px]"></div>
                        
                </div>
                <div className="absolute w-full flex justify-center pr-2 z-30">
                    <h2 className="font-sans font-semibold text-[0.625rem] sm:text-sm text-neutral-700">{title}</h2>
                </div>
               
            </div>
            <div className="absolute top-[6%] h-[94%] w-full bg-white flex justify-center rounded-b-lg s:rounded-b-xl overflow-hidden z-30 ">

           {children}
                    
               
            </div>
        </div>
    )
}
export default Window