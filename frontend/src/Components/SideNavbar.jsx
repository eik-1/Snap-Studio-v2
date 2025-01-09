import { NavLink, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { House, Settings, BookImage, Layers, User2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/contexts/UserContext"
import { useState } from "react"



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
        { icon: <House size={24} />, label: "Home", route: "/app" },
        {
            icon: <BookImage size={24} />,
            label: "My Images",
            route: "myimages",
        },
        {
            icon: <Layers size={24} />,
            label: "Saved Models",
            route: "savedmodels",
        },
        { icon: <Settings size={24} />, label: "Settings", route: "settings" },
    ]

    return (
        <motion.nav
            className="fixed  left-0  h-screen  bg-white/75 backdrop-blur-2xl border-r z-[100] hover:border-none"
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
                                className={`cursor-pointer text-gray-500 w-full  rounded-xl  `}
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
                                    end
                                >
                                    <div>{item.icon}</div>
                                    {isHovered && (
                                        <motion.p
                                            className="whitespace-nowrap"
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

                <div className="flex h-12  w-full text-gray-500 p-3  space-x-6  pt-4 ">
                    <div>
                        <User2 size={24} />
                    </div>

                    {isHovered && (
                        <div className="flex flex-col text-neutral-800">
                            <p className="text-md font-semibold">{user.name}</p>
                            <div>
                                <button onClick={handleLogout}>
                                    <span className="text-red-500">Log out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    )
}
export default SideNavbar
