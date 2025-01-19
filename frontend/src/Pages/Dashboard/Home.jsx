import SidePanel from "@/Components/SidePanel"
import ImageResultSection from "@/Components/ImageResultSection"
function Home() {

    return (
            <div className="h-full w-full flex flex-col sm:flex-row overflow-y-auto  ">
            
             <div className="relative flex-shrink-0 h-max sm:h-full w-full sm:w-80 lg:w-96 flex flex-col items-center   bg-gray-200 overflow">
             <SidePanel/>
            </div> 
          
            
            
            
            <div className="h-32 sm:h-full flex-grow flex flex-col items-center  gap-4 overflow-y-auto ">
            <ImageResultSection/> 
            </div>
            
            </div>       

        
    )
}
export default Home
