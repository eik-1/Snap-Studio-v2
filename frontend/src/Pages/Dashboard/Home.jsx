import HomeHeader from "@/Components/HomeHeader"
import ServiceDock from "@/Components/ServiceDock"
function Home() {
    return (
       <div className="relative w-full h-full   overflow-auto">
        <div className="h-2/5 w-full absolute top-0 left-0 bg-gradient-to-b from-sky-100 via-sky-50 -z-10 px-6  ">

        </div>
                <HomeHeader/>
                <ServiceDock/>
       </div>
    )
}
export default Home
