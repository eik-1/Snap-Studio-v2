import { Outlet } from "react-router-dom"
import Header from "@/Components/Header"
import SideNavbar from "@/Components/SideNavbar"

import { NavigationProvider } from "@/contexts/NavigationContext"

function RootLayout() {
    console.log("RootLayout get rendered")

    return (
        <>
       
            <SideNavbar />
            
            <div className="min-h-screen ml-16 overflow-hidden font-sans">
                <Header />
            <main className="relative bg-gray-50 h-[calc(100vh-2.5rem)] w-full mt-10 overflow-hidden">
            <Outlet />
            </main>
    
            </div>
        </>
    )
}
export default RootLayout
