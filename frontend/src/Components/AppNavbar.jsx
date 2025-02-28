import { NavLink, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { House, Settings, BookImage, Layers, User2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
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
    const { toast } = useToast()

    const [isHovered, setIsHovered] = useState(false)
    async function handleLogout() {
        await logoutUser()
        toast({
            description: "Logged out successfully",
        })
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
            className="hidden sm:block fixed font-sans left-0  h-screen  bg-white/75 backdrop-blur-2xl border-r z-[85] hover:border-none"
            whileHover={{
                width: "14rem",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
            }}
            initial={{ width: "4rem" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            transition={{
                type: "spring",
                stiffness: 150,
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
                                        `w-full flex space-x-6 rounded-xl p-3 transition-all duration-200 ${
                                            isActive
                                                ? "bg-purple-500 text-white"
                                                : "hover:text-purple-500"
                                        }`
                                    }
                                    end={item.route!=="myimages"}
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

                <div className="flex h-12  w-full text-gray-500 p-3  space-x-6  mb-3">
                    <div>
                        <User2 size={20} />
                    </div>

                    {isHovered && (
                        <div className="flex flex-col gap-1 text-neutral-800">
                            <p className="text-base font-semibold leading-none">
                                {user.first_name}
                            </p>
                            <p className="text-base font-semibold leading-none">
                                {user?.last_name}
                            </p>
                            <div>
                                <button onClick={handleLogout}>
                                    <span className="text-red-500 text-sm">
                                        Log out
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    )
}
function MobileNavbar() {
    return (
        <div className="sm:hidden fixed bottom-0 w-full h-16  bg-white/75 backdrop-blur-2xl border-t z-[85]">
            <nav className="flex justify-between items-center p-2 pb-0 ">
                <NavLink
                    to="/app"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center space-y-1 p-2 rounded-2xl transition-all duration-200 ${
                            isActive ? " text-purple-500" : "text-gray-500 "
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
