import AppNavbar from "@/Components/AppNavbar"
import Header from "@/Components/Header"
import ProgressiveBlur from "@/Components/ProgressiveBlur"
import { Outlet } from "react-router-dom"

function RootLayout() {
    return (
        <div className="h-screen w-screen overflow-hidden">
            <AppNavbar />
            <Header />
            <ProgressiveBlur />

            <main className="relative h-full w-full overflow-hidden  font-sans">
                <Outlet />
            </main>
        </div>
    )
}
export default RootLayout
