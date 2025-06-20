import AppNavbar from "@/Components/AppNavbar"
import Header from "@/Components/Header"
import ProgressiveBlur from "@/Components/ProgressiveBlur"
import { Outlet } from "react-router-dom"

function RootLayout() {
    return (
        <div className="h-[100dvh] w-[100dvw] overflow-hidden">
         
            <Header />
            <ProgressiveBlur />

            <main className="relative h-full w-full overflow-hidden  font-sans">
                <Outlet />
            </main>
        </div>
    )
}
export default RootLayout
