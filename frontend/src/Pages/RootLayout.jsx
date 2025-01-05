import { Outlet } from "react-router-dom"
import Header from "../Components/Header"
import { useLocation } from "react-router-dom"


function RootLayout() {


    return (
        <div className="min-h-screen">
            <Header />
            <Outlet />
        </div>
    )
}
export default RootLayout
