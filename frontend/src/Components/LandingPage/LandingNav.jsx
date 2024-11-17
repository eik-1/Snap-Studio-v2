import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUser } from "@/contexts/UserContext"
import { useToast } from "@/hooks/use-toast"
import { Button } from "../UI/Button"
import { Menu, X } from "lucide-react"

function LandingNav() {
    const navigate = useNavigate()
    const { toast } = useToast()
    const { user } = useUser()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth > 1024) {
                setIsMenuOpen(false)
            }
        })
    })

    function handleDashboard() {
        if (user) {
            navigate("/home")
        } else {
            toast({
                description: "Please login to access the dashboard",
            })
        }
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className="flex items-center justify-between p-4 lg:px-8">
            <div className="flex items-center space-x-2">
                <span
                    className="text-2xl font-bold text-primary cursor-pointer"
                    onClick={() => navigate("/")}
                >

                    SnapSTUDIO
                </span>
            </div>
            <div className="hidden lg:flex items-center space-x-3 text-lg font-bold">
                <NavLink
                    to="/pricing"
                    className="text-base-content hover:bg-base-200 rounded-md px-3 py-2"
                >
                    Pricing
                </NavLink>

                <NavLink
                    to="/gallery"
                    className="text-base-content hover:bg-base-200 rounded-md px-3 py-2"
                >
                    Gallery
                </NavLink>

                {!user ? (
                    <NavLink
                        to="/login"
                        className="text-base-content hover:bg-base-200 rounded-md px-3 py-2"
                    >
                        Login
                    </NavLink>
                ) : (
                    <span className="text-base-content hover:bg-base-200 rounded-md px-3 py-2">
                        Hello, {user.name}
                    </span>
                )}

                <Button
                    className="bg-secondary hover:bg-secondary rounded-md text-base-content text-lg font-bold"
                    onClick={handleDashboard}
                >
                    Dashboard →
                </Button>
            </div>
            <div className="lg:hidden">
                <button
                    onClick={toggleMenu}
                    className="text-base-content hover:bg-base-200 rounded-md"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 shadow-lg z-10 rounded-b-md w-screen">
                    <div className="flex flex-col items-start py-3 space-y-2 text-lg font-bold bg-white">
                        <NavLink
                            to="/pricing"
                            className="text-base-content hover:bg-base-200 rounded-md w-full px-3 py-2"
                            onClick={toggleMenu}
                        >
                            Pricing
                        </NavLink>
                        <NavLink
                            to="/gallery"
                            className="text-base-content hover:bg-base-200 rounded-md w-full px-3 py-2"
                            onClick={toggleMenu}
                        >
                            Gallery
                        </NavLink>
                        {!user ? (
                            <NavLink
                                to="/login"
                                className="text-base-content hover:bg-base-200 rounded-md w-full px-3 py-2"
                                onClick={toggleMenu}
                            >
                                Login
                            </NavLink>
                        ) : (
                            <span className="text-base-content hover:bg-base-200 rounded-md w-full px-3 py-2">
                                Hello, {user.name}
                            </span>
                        )}
                        <Button
                            className="bg-secondary hover:bg-secondary rounded-md text-base-content text-lg font-bold w-full"
                            onClick={() => {
                                handleDashboard()
                                toggleMenu()
                            }}
                        >
                            Dashboard →
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default LandingNav
