

import ContentPanel from "@/Components/ContentPanel"
import CustomImageActionDock from "@/Components/CustomImageActionDock"
function CustomImageServicePage()
{
    return (
        <div className=" h-[calc(100vh-3rem)] mt-12 flex flex-col  md:flex-row relative overflow-hidden  ">
               <section className="h-full w-full flex-shrink-0 relative pt-4">
               <div className=" w-full h-full flex flex-col items-center justify-center overflow-hidden">
                    <ContentPanel />
                </div>
            </section>

            <CustomImageActionDock />
        </div>
    )
}
export default CustomImageServicePage