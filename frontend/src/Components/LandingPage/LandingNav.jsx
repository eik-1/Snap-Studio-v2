import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUser } from "@/contexts/UserContext"
import { useToast } from "@/hooks/use-toast"
import { Menu, X } from "lucide-react"
import { useLocation } from "react-router-dom"
import { motion } from "motion/react"

function LandingNav() {
    const navigate = useNavigate()
    const location = useLocation()
    const { toast } = useToast()
    const { user } = useUser()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolledDown, setScrolledDown] = useState(false)
    
    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
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
            navigate("/app")
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
                className={`fixed top-0 flex flex-col lg:flex-row lg:items-center lg:justify-between py-2 lg:py-8 rounded-full bg-white/75 backdrop-blur-xl px-6 lg:px-12 z-50 ${scrolledDown ? "drop-shadow-lg border lg:px-6" : ""} ${(location.pathname === "/login" || location.pathname === "/terms" || location.pathname === "/privacy") && "hidden"} ${isMenuOpen && "drop-shadow-xl"}`}
                initial={false}
                animate={{
                    width: scrolledDown ? "75%" : "100%",
                    marginTop: scrolledDown ? "0.7rem" : "0",
                    transform: scrolledDown
                        ? "translateX(-50%)"
                        : "translateX(-50%)",
                    left: scrolledDown ? "50%" : "50%",
                    height: isMenuOpen ? "16rem" : "3rem",
                    borderRadius: isMenuOpen && "2rem",
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 1.5
                }}
            >
                <div className="text-xl w-full flex lg:pl-0 text-center lg:w-max lg:text-2xl font-bold cursor-pointer">
                    <p className="w-full pl-6 lg:pl-0 lg:w-max">
                        <span
                            onClick={() => navigate("/")}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600"
                        >
                            SnapStudio
                        </span>
                    </p>
                    <div className="lg:hidden z-[80] flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:bg-gray-100 rounded-md z-[80]"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                
                <div className={`hidden lg:flex items-center space-x-3 text-lg font-medium ${user ? "ml-24" : "ml-8"}`}>
                    {location.pathname === "/" && (
                        <div className="group hover:-translate-y-1 transform rounded-full px-4 py-2 transition-all duration-300">
                            <a
                                href="#pricing"
                                className="text-gray-500 group-hover:text-gray-800 transition-colors duration-300"
                            >
                                Pricing
                            </a>
                        </div>
                    )}
                    
                    <div className="group hover:-translate-y-1 transform rounded-full px-4 py-2 transition-all duration-300">
                        <NavLink
                            to="/gallery"
                            end
                            className={({ isActive }) =>
                                `group-hover:text-gray-800 transition-colors duration-300 ${isActive ? "text-gray-800" : "text-gray-500"}`
                            }
                        >
                            Gallery
                        </NavLink>
                    </div>
                   
                    {location.pathname === "/" && (
                        <div className="group hover:-translate-y-1 transform rounded-full px-4 py-2 transition-all duration-300">
                            <a
                                href="#features"
                                className="text-gray-500 group-hover:text-gray-800 transition-colors duration-300"
                            >
                                Features
                            </a>
                        </div>
                    )}
                </div>

                <div className="gap-4 hidden lg:flex">
                    {!user ? (
                        <NavLink
                            to="/login"
                            className="bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 text-transparent bg-clip-text rounded-md py-2 transition-colors duration-300 from-gray-800 to-gray-600"
                        >
                            Login
                        </NavLink>
                    ) : (
                        <span className="bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 text-transparent bg-clip-text rounded-md px-3 py-2 transition-colors duration-300 from-gray-800 to-gray-600">
                            Hi {user.first_name}
                        </span>
                    )}

                    <button
                        className="bg-gray-900 rounded-full text-white px-4 text-lg font-bold hidden lg:block transition-all duration-300"
                        onClick={handleDashboard}
                    >
                        Dashboard →
                    </button>
                </div>

                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="flex flex-col items-center mt-2 gap-2 lg:hidden"
                    >
                        <NavLink
                            to="/pricing"
                            className="text-gray-700 hover:text-gray-900 rounded-md px-3 py-2 transition-colors duration-300"
                            onClick={toggleMenu}
                        >
                            Pricing
                        </NavLink>
                        <NavLink
                            to="/gallery"
                            className="text-gray-700 hover:text-gray-900 rounded-md px-3 py-2 transition-colors duration-300"
                            onClick={toggleMenu}
                        >
                            Gallery
                        </NavLink>
                        {!user ? (
                            <NavLink
                                to="/login"
                                className="text-gray-700 hover:text-gray-900 rounded-md px-3 py-2 transition-colors duration-300"
                                onClick={toggleMenu}
                            >
                                Login
                            </NavLink>
                        ) : (
                            <span className="text-gray-700 text-center hover:bg-gray-100 rounded-md w-full px-3 py-2 transition-colors duration-300">
                                Hello, {user.first_name}
                            </span>
                        )}
                        <div className="w-full flex border-t border-gray-200 pt-2 justify-center">
                            <button 
                                className="group relative px-4 py-2 bg-gray-900  text-white font-semibold rounded-full w-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                                onClick={handleDashboard}
                            >
                                <span className="relative z-10">Dashboard</span>
                               
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.nav>
        </>
    )
}

export default LandingNav