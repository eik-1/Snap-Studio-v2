import { Outlet } from "react-router-dom"
import Header from "../Components/Header"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

function RootLayout() {
    const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location]);
    return (
        <div className="min-h-screen">
            <Header />
            <Outlet />
        </div>
    )
}
export default RootLayout
