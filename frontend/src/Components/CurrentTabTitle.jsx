import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import {
    Home,
    BookImage,
    Layers,
    Settings,
    ChevronDown,
    Camera,
    Image,
    Palette,
    Shirt,
    Plus,
} from "lucide-react"

function DynamicNavigation() {
    const [isExpanded, setIsExpanded] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const path = location.pathname.split("/").pop()

    const createItems = [
        { icon: <Camera size={18} />, label: "Headshot", route: "headshot" },
        {
            icon: <Image size={18} />,
            label: "Custom Image",
            route: "custom-image",
        },
        { icon: <Palette size={18} />, label: "Styles", route: "image-styles" },
        {
            icon: <Shirt size={18} />,
            label: "Fashion Try-On",
            route: "fashion",
        },
    ]

    const navData = [
        { icon: <Home size={20} />, label: "Home", route: "app" },
        {
            icon: <Plus size={20} />,
            label: "Create",
            route: "",
            isExpandable: true,
            children: createItems,
        },
        {
            icon: <BookImage size={20} />,
            label: "My Images",
            route: "myimages",
        },
        { icon: <Layers size={20} />, label: "My Models", route: "mymodels" },
       
    ]

    const getCurrentTitle = () => {
        switch (path) {
            case "app":
                return "Home"
            case "headshot":
                return "Generate Headshot"
            case "fashion":
                return "AI Fashion Try-On"
            case "image-styles":
                return "Image Styles"
            case "custom-image":
                return "Custom Image "
            case "myimages":
                return "My Images"
            case "mymodels":
                return "My Models"
            case "settings":
                return "Settings"
            default:
                return "Navigation"
        }
    }
    const handleNavClick = (route) => {
        if (!route) return
        if (route === "app") 
            {
                navigate("/app")
            } 
            else
            {
                navigate(`/app/${route}`)
            }
        setIsExpanded(false)
    }

    const title = getCurrentTitle()

    return (
        <div className=" font-sans relative">
            {/* Main Button */}
            <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-black/85 md:flex py-2 px-4 bg-white/80 backdrop-blur-md text-xs sm:text-sm font-medium rounded-full border shadow-sm min-w-fit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span className="text-nowrap">{title}</span>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={16} />
                </motion.div>
            </motion.button>

            {/* Expanded Menu */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                        }}
                        className="absolute w-[280px] top-full left-0 right-0 mt-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden z-50"
                    >
                        <div className="p-2 flex flex-col ">
                            {navData.map((item, index) => {
                                const isActive =
                                    (item.route === "/app" && path === "app") ||
                                    (item.route !== "/app" &&
                                        path === item.route)

                                return (
                                    <>
                                    <motion.button
                                        key={item.route}
                                        onClick={() =>
                                           item?.route && handleNavClick(item.route)
                                        }
                                        className={`
                                                w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-200
                                                ${
                                                    isActive
                                                        ? "bg-black/5 text-black"
                                                        : "text-black/70 hover:bg-black/5 hover:text-black"
                                                }
                                            `}
                                        transition={{
                                            delay: index * 0.05,
                                            duration: 0.6,
                                            ease: [0.6, -0.05, 0.01, 0.99],
                                        }}
                                    >
                                        <span
                                            className={
                                                isActive
                                                    ? "text-black"
                                                    : "text-black/60"
                                            }
                                        >
                                            {item.icon}
                                        </span>
                                        <span>{item.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="ml-auto w-2 h-2 bg-black rounded-full"
                                            />
                                        )}
                                    </motion.button>
                                       {item.isExpandable &&  (
                                        <div className="ml-5 mt-1 border-l px-1 border-black/10">
                                            {createItems.map((createItem, createIndex) => {
                                                const isCreateActive = path === createItem.route;
                                                
                                                return (
                                                    <button
                                                        key={createItem.route}
                                                        onClick={() => handleNavClick(createItem.route)}
                                                        className={`
                                                            w-full flex items-center gap-3 p-2 pl-4 text-sm transition-all duration-200 rounded-lg
                                                            ${isCreateActive 
                                                                ? 'text-black font-medium bg-black/5' 
                                                                : 'text-black/60 hover:text-black/80 hover:bg-black/5'
                                                            }
                                                        `}
                                                    >
                                                        <span className={isCreateActive ? 'text-black' : 'text-black/50'}>
                                                            {createItem.icon}
                                                        </span>
                                                        <span>{createItem.label}</span>
                                                        {isCreateActive && (
                                                            <div className="ml-auto w-1.5 h-1.5 bg-black rounded-full" />
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                    </>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop to close menu */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setIsExpanded(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

export default DynamicNavigation
