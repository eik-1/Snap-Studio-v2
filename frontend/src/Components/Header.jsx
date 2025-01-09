import Avvvatars from "avvvatars-react"
import { LogOut } from "lucide-react"
import React from "react"
import { useNavigate } from "react-router-dom"

import { useUser } from "@/contexts/UserContext"
import { useToast } from "@/hooks/use-toast"
import { NavLink } from "react-router-dom"
import { Button } from "./UI/Button"

function Header() {
  

    return (
        <header className="flex h-[2.5rem] w-full justify-end px-6 py-4 bg-white border-[1px] fixed top-0 z-50">
          
           
            
            <div className="flex items-center space-x-3">
             
            </div>
        </header>
    )
}

export default Header
