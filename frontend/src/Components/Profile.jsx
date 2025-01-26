import { useUser } from "@/contexts/UserContext"
import { useState, useEffect, useRef } from "react"
import { User2Icon, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
function Profile() {
    const { user, logoutUser } = useUser()
    const { toast } = useToast()
    const navigate = useNavigate()
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
    async function handleLogout() {
        await logoutUser()
        toast({
            description: "Logged out successfully",
        })
        navigate("/")
    }
    return (
        <div
            className="flex relative sm:hidden items-center gap-2"
            ref={menuRef}
        >
            <div
                className=" relative  flex flex-col items-center justify-center h-full text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-75"
                role="button"
                onClick={handleClick}
            >
                <User2Icon size="20" />
            </div>
            {isProfileMenuOpen && (
                <div className="absolute top-10 right-0 bg-white/75 backdrop-blur-2xl w-max  h-max p-4 gap-3 flex flex-col  justify-center border-[1px] shadow-md rounded-lg">
                    <div className="flex items-center gap-1 text-gray-700">
                        <User2Icon size="20" round={true} />
                        <h3 className="text-sm ">
                            {user.first_name + " " + user.last_name}
                        </h3>
                    </div>
                    <div
                        className="flex items-center gap-1 cursor-pointer text-gray-700 "
                        onClick={handleLogout}
                    >
                        <LogOut size="20" />
                        <p className="text-sm text-rose-500 ">Logout</p>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Profile
