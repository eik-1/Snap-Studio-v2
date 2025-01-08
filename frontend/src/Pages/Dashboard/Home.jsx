import SidePanel from "@/Components/SidePanel"
import OptionPanel from "@/Components/OptionsPanel"
import ImageGrid from "@/Components/Images"
function Home() {

    return (
            <div className="h-full w-full flex flex-wrap overflow-auto">
            
            <SidePanel>
                <OptionPanel/>
            </SidePanel>
            
            
            
            <div className="h-full w-2/3 flex flex-col items-center  gap-4 p-4 overflow-y-auto ">
            <ImageGrid/> 
            </div>
            
            </div>       

        
    )
}
export default Home
