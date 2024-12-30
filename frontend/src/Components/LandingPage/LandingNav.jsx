import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUser } from "@/contexts/UserContext"
import { useToast } from "@/hooks/use-toast"
import { Menu, X } from "lucide-react"
import {motion} from "motion/react"

function LandingNav() {
    const navigate = useNavigate()
    const { toast } = useToast()
    const { user } = useUser()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolledDown, setScrolledDown] = useState(false)
    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth > 1024) {
                setIsMenuOpen(false)
            }
        })
        window.addEventListener("scroll", () => {
            if (window.scrollY > 10) {
                setScrolledDown(true)
            } else if (window.scrollY <= 10) {
                setScrolledDown(false)
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
        <>
            <motion.nav
                className={`fixed  top-0 flex items-center justify-between p-2 rounded-full bg-white   lg:px-14  z-50 bg-transparent ${scrolledDown ? "drop-shadow-lg lg:px-8 " : ""}`}
                initial={false}
                animate={{ width: scrolledDown?"75%":"100%", marginTop:scrolledDown?"0.7rem":"0", transform: scrolledDown?"translateX(-50%)":"translateX(-50%)", left: scrolledDown?"50%":"50%" }}
                transition={{ type: "spring", stiffness: 150, damping: 20, mass:0.7 }}
            
            >
                <div className="flex items-center space-x-2">
                    <span
                        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-rose-500 to-orange-500 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        SnapSTUDIO
                    </span>
                </div>
                <div className="hidden lg:flex items-center space-x-3 text-lg font-medium">
                    <NavLink
                        to="/pricing"
                        className="text-neutral-600 hover:text-neutral-900 rounded-md px-3 py-2"
                    >
                        Pricing
                    </NavLink>

                    <NavLink
                        to="/gallery"
                        className="text-neutral-600 hover:text-neutral-900 rounded-md px-3 py-2"
                    >
                        Gallery
                    </NavLink>
                    <NavLink
                        to="/pricing"
                        className="text-neutral-600 hover:text-neutral-900 rounded-md px-3 py-2"
                    >
                        Features
                    </NavLink>
                </div>

                <div className="flex gap-2">
                    {!user ? (
                        <NavLink
                            to="/login"
                            className="text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-full px-3 py-2"
                        >
                            Login
                        </NavLink>
                    ) : (
                        <span className="text-neutral-700 hover:bg-neutral-50 rounded-md px-3 py-2">
                            Hello, {user.name}
                        </span>
                    )}

                    <button
                        className="bg-purple-600 block  rounded-full text-white px-4 text-lg font-bold"
                        onClick={handleDashboard}
                    >
                        Dashboard →
                    </button>
                </div>
                <div className="lg:hidden lg:z-[80]">
                    <button
                        onClick={toggleMenu}
                        className="text-base-content hover:bg-base-200 rounded-md z-[80]"
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
                            <button
                                className="bg-secondary hover:bg-secondary rounded-md text-base-content text-lg font-bold w-full"
                                onClick={() => {
                                    handleDashboard()
                                    toggleMenu()
                                }}
                            >
                                Dashboard →
                            </button>
                        </div>
                    </div>
                )}
            </motion.nav>
        </>
    )
}

export default LandingNav
