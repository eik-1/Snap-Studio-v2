import { Outlet } from "react-router-dom"
import LandingNav from "../Components/LandingPage/LandingNav"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function LandingRootLayout() {
    const location = useLocation();
     useEffect(() => {
        window.scrollTo(0, 0); 
      }, [location]);
    return (
        <div className="h-screen">
            <LandingNav />
            <Outlet />
        </div>
    )
}
export default LandingRootLayout
