

import ContentPanel from "@/Components/ContentPanel"
import CustomImageActionDock from "@/Components/CustomImageActionDock"
function CustomImageServicePage()
{
    return (
        <section className="sm:w-[calc(100%-4rem)] h-full sm:ml-16   pt-12 flex  relative">
            <div className="h-full w-full overflow-auto">
                <ContentPanel />
            </div>

            <CustomImageActionDock />
        </section>
    )
}
export default CustomImageServicePage