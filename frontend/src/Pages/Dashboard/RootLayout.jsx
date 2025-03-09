import AppNavbar from "@/Components/AppNavbar"
import Header from "@/Components/Header"
import { Outlet } from "react-router-dom"

import { NavigationProvider } from "@/contexts/NavigationContext"

function RootLayout() {
    return (
        <>
            <AppNavbar />
            <Header />
            <div className="min-h-screen sm:ml-16 z-50 overflow-hidden font-sans">
                <main className="relative bg-white  h-[calc(100dvh-3rem)] w-full sm:w-[calc(100dvw-4rem)]  mt-12 overflow-hidden">
                    <Outlet />
                </main>
            </div>
            
        </>
    )
}
export default RootLayout
