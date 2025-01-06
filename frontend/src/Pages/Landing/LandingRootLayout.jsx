import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import LandingNav from "@/Components/LandingPage/LandingNav"

function LandingRootLayout() {
    const location = useLocation();
     useEffect(() => {
        window.scrollTo(0, 0); 
      }, [location]);
    return (
        <div className="h-screen  max-w-[1024px] px-8 mx-auto">
            <LandingNav />
            <Outlet />
        </div>
    )
}
export default LandingRootLayout
