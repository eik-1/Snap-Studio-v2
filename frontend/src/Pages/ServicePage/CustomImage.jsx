import CustomImageForm from "@/Components/CustomImageActionDock"
import ImageResultSection from "@/Components/ImageResultSection"
import ContentPanel from "@/Components/ContentPanel"
function CustomImageServicePage()
{
    return(
        <section className="w-[calc(100%-4rem)] h-full ml-16   pt-12 flex  relative">
            <div className="h-full w-full">
                 <ContentPanel></ContentPanel>
            </div>
           
            <CustomImageForm/>
        </section>
    )
}
export default CustomImageServicePage