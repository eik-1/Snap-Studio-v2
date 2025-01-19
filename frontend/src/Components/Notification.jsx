import { BellIcon } from "lucide-react";
import { useState } from "react";
function NotificationTray()
{
    return(
        <div className="absolute z-30 top-12 right-0 w-[20rem] h-[30rem] border-[1px] bg-white/75 backdrop-blur-3xl shadow-md rounded-md p-4">
            <div className="flex justify-between border-b-[1px] pb-2">
            <div className="flex items-center gap-2">
            <BellIcon className="w-4 h-4 text-gray-500" />
            <h2 className="text-lg font-medium">Notifications</h2>
          </div>
                <button className="text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-md transition-all">Clear All</button>
            </div>
           
        </div>
    )

}
export default function NotificationButton()
{
    
    const [notificationTrayOpen, setNotificationTrayOpen] = useState(false)
    return (
        <div className="h-max w-max flex relative p-2 ">
                    <div className="h-max w-max  text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-75"
                    onClick={() => {setNotificationTrayOpen((prev) => !prev)}}
                    >
                    <BellIcon size={20} />

        </div>
        <div className="absolute top-2 right-3 bg-green-400 shadow-md  w-[6px] h-[6px] rounded-full">

        </div>
        {notificationTrayOpen &&
        <>
      
        <NotificationTray/>
        </>
        }
        </div>
        
    )
}
