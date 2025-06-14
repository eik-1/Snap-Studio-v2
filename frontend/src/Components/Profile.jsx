import { useUser } from "@/contexts/UserContext"
import { useState, useEffect, useRef } from "react"
import { User2Icon, LogOut,
    Settings, HelpCircle,
 
 } from "lucide-react"
import { toast} from "sonner"
import { useNavigate } from "react-router-dom"
import {motion, AnimatePresence} from "motion/react"
import { cn } from "@/lib/utils"
function Profile() {
 
   
    const menuRef = useRef(null)
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    function handleClickOutside(e) {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsProfileMenuOpen(false)
        }
    }
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 640) {
                setIsProfileMenuOpen(false)
            }
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })
    useEffect(() => {
        if (isProfileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isProfileMenuOpen])
    function handleClick(e) {
        e.stopPropagation()
        setIsProfileMenuOpen((prev) => !prev)
    }
   
    return (
        <div
            className="flex relative  items-center gap-2"
            ref={menuRef}
        >
            <div
                 className="relative h-max w-max bg-white/80 backdrop-blur-md border shadow-sm hover:shadow-md  rounded-full p-2  text-black/80 hover:text-black cursor-pointer transition-all duration-75"
                role="button"
                onClick={handleClick}
            >
                <User2Icon className="h-3 w-3 sm:h-4 sm:w-4" />
            </div>
            <AnimatePresence>

           
            {isProfileMenuOpen && (
               <ProfileMenu
                   setIsProfileMenuOpen={setIsProfileMenuOpen}
               />
            )}
             </AnimatePresence>
        </div>
    )
}
function ProfileMenu({ setIsProfileMenuOpen })
{
    
    const { user, logoutUser } = useUser()
    const navigate = useNavigate()
    async function handleLogout() {
        await logoutUser()
        toast.success("Logged out successfully")
        navigate("/")
    }
    async function handleMenuItemClick(action) {
        switch (action) {
            case "settings":
                navigate("/app/settings")
                setIsProfileMenuOpen(false)
                break
            case "help":
                navigate("/help")
                break
            case "logout":
                await handleLogout()
                break
            default:
                console.warn("Unknown action:", action)
        }
    }
   const getInitials = () => {
        return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase();
    };

    const menuItems = [
        {
            icon: <Settings size={18} />,
            label: "Settings",
            action: "settings",
          

        },
        {
            icon: <HelpCircle size={18} />,
            label: "Help & Support",
            action: "help",
        },
        {
            icon: <LogOut size={18} />,
            label: "Logout",
            action: "logout",
            className: "hover:text-red-600",
      
         
      
        }
    ];
    return(
             <motion.div 
                            className="absolute top-full right-0 mt-2  bg-white/85 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl overflow-hidden z-50 font-sans"
                             initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                        }}
                        >
                        {/* User Info Header */}
                        <div className="p-4 ">
                            <div className="flex items-center gap-3">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                        {getInitials()}
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                                        {user.first_name} {user.last_name}
                                    </h3>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                            {menuItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={item.onClick || (() => handleMenuItemClick(item.action))}
                                    disabled={item.disabled}
                                    className={cn(`
                                        w-full flex items-center gap-3 p-3 rounded-xl text-sm text-black/70 hover:text-black hover:bg-black/5 font-medium transition-all duration-200
                                     
                                           ${item?.className || ''}`)
                                          

                                      
                                    }>
                                        <span className="flex-shrink-0">
                                            {item.icon}
                                        </span>
                                        <span className="flex-1 text-left">{item.label}</span>
                                    </button>
                            ))}
                        </div>

                       
                    </motion.div>
    )
}
export default Profile
