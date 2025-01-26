import SidePanel from "@/Components/SidePanel"
import ImageResultSection from "@/Components/ImageResultSection"
function Home() {
    return (
        <div className="h-full w-full sm:flex sm:flex-row overflow-y-auto custom-scrollbar  ">
            <div className="relative mb-12 sm:mb-0 sm:flex-shrink-0 h-max sm:h-full w-full sm:w-80 lg:w-[26rem] flex flex-col items-center   bg-gray-200 overflow-hidden">
                <SidePanel />
            </div>

            <div className="h-screen pb-8 sm:pb-0 sm:h-full w-full sm:flex-grow flex flex-col gap-4 overflow-hidden ">
                <ImageResultSection />
            </div>
        </div>
    )
}
export default Home
