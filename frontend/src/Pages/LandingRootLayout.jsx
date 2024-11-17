import { Outlet } from "react-router-dom"
import LandingNav from "../Components/LandingPage/LandingNav"

function LandingRootLayout() {
    return (
        <div className="min-h-screen">
            <LandingNav />
            <Outlet />
        </div>
    )
}
export default LandingRootLayout
