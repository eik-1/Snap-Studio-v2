import SidePanel from "@/Components/SidePanel"
import ImageResultSection from "@/Components/ImageResultSection"
function Home() {

    return (
            <div className="h-full w-full flex flex-wrap overflow-auto ">
            
             <div className="h-max sm:h-full w-full  sm:w-[50%] lg:w-[30%] flex flex-col items-center   bg-gray-200">
             <SidePanel/>
            </div> 
          
            
            
            
            <div className="h-full w-full sm:w-[50%] lg:w-[70%] flex flex-col items-center  gap-4 overflow-y-auto ">
            <ImageResultSection/> 
            </div>
            
            </div>       

        
    )
}
export default Home
