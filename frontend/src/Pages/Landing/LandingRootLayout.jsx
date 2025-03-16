import LandingNav from "@/Components/LandingPage/LandingNav"
import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
function LandingRootLayout() {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
    return (
        <div className="min-h-screen px-6 sm:px-8   mx-auto">
            <LandingNav />
            <Outlet />
        </div>
    )
}
export default LandingRootLayout
