import Avvvatars from "avvvatars-react"
import { LogOut } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router-dom"

import { useUser } from "@/contexts/UserContext"
import { useToast } from "@/hooks/use-toast"
import { NavLink } from "react-router-dom"
import { Button } from "./UI/Button"

function Header() {
    const navigate = useNavigate()
    const { user, logout } = useUser()
    const { toast } = useToast()

    function handleLogin() {
        navigate("/")
    }

    async function handleLogout() {
        await logout()
        toast({
            description: "Logged out successfully",
        })
        navigate("/")
    }

    return (
        <header className="flex max-h-[10dvh] w-full justify-between items-center px-6 py-4 bg-white border-[1px] fixed top-0 z-50">
            <div className="flex items-center space-x-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-700 text-2xl font-bold font-sans">
                    SnapStudio
                </span>
            </div>
            <nav>
                <ul className="flex items-center space-x-4 gap-12 font-sans">
                    <li>
                        <NavLink
                            to="/home"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "text-slate-800 font-bold" // Active styles
                                    : "text-gray-600 hover:text-gray-800"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/home/mycollection"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-slate-800 font-bold" // Active styles
                                    : "text-gray-600 hover:text-gray-800"
                            }
                        >
                            My Collection
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="flex items-center space-x-3">
                {user ? (
                    <>
                        <Avvvatars value={user.name} />
                        <span className="text-gray-600 font-semibold">
                            {user.name}
                        </span>
                        <button onClick={handleLogout}>
                            <LogOut size={20} />
                        </button>
                    </>
                ) : (
                    <Button onClick={handleLogin}>Sign In / Sign Up</Button>
                )}
            </div>
        </header>
    )
}

export default Header
