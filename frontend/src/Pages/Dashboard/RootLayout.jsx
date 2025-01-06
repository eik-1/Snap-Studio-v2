import { Outlet } from "react-router-dom"
import Header from "@/Components/Header"
import SideBar from "@/Components/SideBar"


function RootLayout() {


    return (
        <div className="min-h-screen">
            <Header />
            <SideBar />
            <Outlet />
        </div>
    )
}
export default RootLayout
