import { Link, useLocation } from "react-router-dom"
import { House, Settings, BookImage, Layers, User2 } from "lucide-react"
import {motion, AnimatePresence} from "motion/react"
import Separator from "@/Components/UI/separator"

import {useState} from "react"
function SideBar() {

    const navData = [
        { icon: <House size={24}/>, label:"Home" },
        { icon: <Settings size={24} />, label:"Settings" },
        { icon: <BookImage size={24} />, label:"My Images" },
        { icon: <Layers size={24} />, label:"Saved Models" },
    ]
    const location = useLocation()
    const [isHovered, setIsHovered] = useState(false)
    return (
        <motion.nav className="fixed  left-0  h-screen  bg-white border-r z-[100]"
        whileHover={{ width: "16dvw", boxShadow: "0 0 5px rgba(0,0,0,0.1)" }}
        initial={{ width: "5dvw"}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass:0.7 }}
        >
            <div className="relative flex flex-col pt-24 px-2 py-8 h-screen w-full">
            <ul className="flex flex-col space-y-6 list-none ">
                {navData.map((item, index) => {
                    return (
                        <li className={`cursor-pointer text-gray-500  w-full flex space-x-6 rounded-xl p-3   ${location.pathname==='/'+item.label.toLowerCase() ? 'bg-purple-500 text-white':'hover:bg-purple-50'}  `} key={index}>
                            <Link to="#" className="block">{item.icon}</Link>
                         
                            {isHovered && <motion.p
                                className="whitespace-nowrap"
                                initial={{ opacity:0 }}
                                animate={{ opacity: 1 }}
                                duration={0.1}
                            >{item.label}</motion.p>}
                        
                        </li>
                    )
                })}
            </ul>
            
            <div className="absolute flex flex-col bottom-8 w-full  space-x-6 border-2">
                
                <Link to="/profile" className=" flex items-center space-x-2 p-3 w-full text-gray-500 hover:bg-purple-50 rounded-xl">
                    <User2 size={24} />
                    {isHovered && <p>rajeev033</p>}
                </Link>
            </div>
            </div>
           
        </motion.nav>
    )
}
export default SideBar
