import AppNavbar from "@/Components/AppNavbar"
import Header from "@/Components/Header"
import ProgressiveBlur from "@/Components/ProgressiveBlur"
import { Outlet } from "react-router-dom"

function RootLayout() {
    return (
        <>
            <AppNavbar />
            <Header />
            <ProgressiveBlur />

            <main className="relative min-h-screen min-w-screen overflow-hidden  font-sans">
                <Outlet />
            </main>
        </>
    )
}
export default RootLayout
