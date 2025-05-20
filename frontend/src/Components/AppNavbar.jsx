import { NavLink, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { House, Settings, BookImage, Layers, User2 } from "lucide-react"

import {toast} from "sonner"
import { useUser } from "@/contexts/UserContext"
import { useState } from "react"

function AppNavbar() {
    return (
        <>
            <SideNavbar />
            <MobileNavbar />
        </>
    )
}

function SideNavbar() {
    const navigate = useNavigate()
    const { user, logoutUser } = useUser()
    

    const [isHovered, setIsHovered] = useState(false)
    async function handleLogout() {
        await logoutUser()
        toast("Logged out successfully")
        navigate("/")
    }
    const navData = [
        { icon: <House size={20} />, label: "Home", route: "/app" },
        {
            icon: <BookImage size={20} />,
            label: "My Images",
            route: "myimages",
        },
        {
            icon: <Layers size={20} />,
            label: "My Models",
            route: "mymodels",
        },
        { icon: <Settings size={20} />, label: "Settings", route: "settings" },
    ]

    return (
        <motion.nav
            className="hidden sm:block fixed font-sans left-0  h-screen    z-[90] hover:border-none"
            whileHover={{
                width: "12rem",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                backdropFilter: "blur(40px)",
                zIndex: 120,
               
                backgroundColor: "rgba(255, 255, 255, 0.75)",
            }}
            initial={{ width: "4rem" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 0.7,
            }}
        >
            <div className="relative flex flex-col justify-between  pt-24 px-2 py-8 h-screen w-full ">
                <ul className="flex flex-col space-y-6 list-none ">
                    {navData.map((item, index) => {
                        return (
                            <li
                                className={`cursor-pointer text-gray-500 w-full  rounded-xl   `}
                                key={index}
                            >
                                <NavLink
                                    to={item.route}
                                    className={({ isActive }) =>
                                        `w-full flex gap-4 rounded-xl p-3 transition-all duration-200 ${
                                            isActive
                                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                                                : "hover:text-purple-600"
                                        }`
                                    }
                                    end={item.route !== "myimages"}
                                >
                                    <div>{item.icon}</div>
                                    {isHovered && (
                                        <motion.p
                                            className="whitespace-nowrap font-medium text-sm"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            duration={0.1}
                                        >
                                            {item.label}
                                        </motion.p>
                                    )}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>

               
            </div>
        </motion.nav>
    )
}
function MobileNavbar() {
    return (
        <div className="hidden fixed bottom-2 left-1/2 -translate-x-1/2 transform rounded-xl shadow-lg  w-4/5 h-16  bg-white/75 backdrop-blur-2xl border z-[90]">
            <nav className="flex justify-between items-center p-2 pb-0 ">
                <NavLink
                    to="/app"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center space-y-1 p-2 rounded-2xl transition-all duration-200 ${
                            isActive ? " text-purple-600" : "text-gray-500 "
                        }`
                    }
                    end
                >
                    <House size={20} />
                    <p className="text-xs">Home</p>
                </NavLink>
                <NavLink
                    to="/app/myimages"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                            isActive ? " text-purple-500" : "text-gray-500 "
                        }`
                    }
                >
                    <BookImage size={20} />
                    <p className="text-xs">My Images</p>
                </NavLink>
                <NavLink
                    to="/app/mymodels"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                            isActive ? " text-purple-500" : "text-gray-500 "
                        }`
                    }
                    end
                >
                    <Layers size={20} />
                    <p className="text-xs">My Models</p>
                </NavLink>
                <NavLink
                    to="/app/settings"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                            isActive ? " text-purple-500" : "text-gray-500 "
                        }`
                    }
                    end
                >
                    <Settings size={20} />
                    <p className="text-xs">Settings</p>
                </NavLink>
            </nav>
        </div>
    )
}

export default AppNavbar
