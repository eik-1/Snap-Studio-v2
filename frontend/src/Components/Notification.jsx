import { BellIcon } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
function NotificationTray({isVisible=false})
{
    
    return(
       
        <motion.div className="absolute z-30 top-12 -right-8 sm:right-2 w-[20rem] h-[30rem] border-[1px] bg-white/75 backdrop-blur-2xl shadow-md rounded-xl p-4"
        initial={{opacity: 0, y: -50}}    
        animate={{opacity:  1 , y:  0}}
        exit={{opacity: 0, y: -50}}
        transition={{type: "spring", stiffness: 300, damping: 18}}
        >
            <div className="flex justify-between border-b-[1px] pb-2">
            <div className="flex items-center gap-2">
            <BellIcon className="w-4 h-4 text-gray-500"
            />
            <h2 className="text-lg font-medium">Notifications</h2>
          </div>
                <button className="text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-md transition-all">Clear All</button>
            </div>
           
        </motion.div>
     
    )

}
export default function NotificationButton()
{
    
    const [notificationTrayOpen, setNotificationTrayOpen] = useState(false)
    return (
        <div className="h-max w-max flex relative ">
                    <div className="h-max w-max  text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-75"
                    onClick={() => {setNotificationTrayOpen((prev) => !prev)}}
                    >
                    <BellIcon size={20} />

        </div>
        <div className="absolute top-2 right-3 bg-green-400 shadow-md  w-[6px] h-[6px] rounded-full">

        </div>
        <AnimatePresence>
        {notificationTrayOpen &&
        <>
      
        <NotificationTray isVisible={true}/>
        </>
        }
         </AnimatePresence>
        </div>
        
    )
}
