import AppNavbar from "@/Components/AppNavbar"
import Header from "@/Components/Header"
import ProgressiveBlur from "@/Components/ProgressiveBlur"
import { Outlet } from "react-router-dom"


function RootLayout() {
    return (
        <>
            <AppNavbar />
            <Header />
          
            <div className="min-h-screen   overflow-hidden font-sans">
                <main className="relative h-screen w-screen overflow-hidden">
                   <Outlet/>
                </main>
            </div>
            
        </>
    )
}
export default RootLayout
