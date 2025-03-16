import { useNotification } from "@/contexts/NotificationContext"
import { AlertTriangle, Bell, Check, Info, X } from "lucide-react"
import React from "react"

const NotificationCard = ({ notification }) => {
    const getTypeDetails = (type) => {
        switch (type) {
            case "success":
                return {
                    icon: <Check size={14} />,
                    color: "bg-green-500",
                    lightColor: "bg-green-50",
                    textColor: "text-green-700",
                    ringColor: "ring-green-200",
                }
            case "warning":
                return {
                    icon: <AlertTriangle size={14} />,
                    color: "bg-amber-500",
                    lightColor: "bg-amber-50",
                    textColor: "text-amber-700",
                    ringColor: "ring-amber-200",
                }
            case "error":
                return {
                    icon: <X size={14} />,
                    color: "bg-red-500",
                    lightColor: "bg-red-50",
                    textColor: "text-red-700",
                    ringColor: "ring-red-200",
                }
            case "info":
                return {
                    icon: <Info size={14} />,
                    color: "bg-blue-500",
                    lightColor: "bg-blue-50",
                    textColor: "text-blue-700",
                    ringColor: "ring-blue-200",
                }
            default:
                return {
                    icon: <Bell size={14} />,
                    color: "bg-gray-500",
                    lightColor: "bg-gray-50",
                    textColor: "text-gray-700",
                    ringColor: "ring-gray-200",
                }
        }
    }

    const { onNotificationDelete } = useNotification()
    const typeDetails = getTypeDetails(notification.type)

    return (
        <div className="w-full mx-auto">
            <div className="bg-white rounded-md shadow-sm border border-gray-100 flex items-center overflow-hidden transition-all duration-200 hover:bg-gray-50">
              
                <div className={`h-full w-1 ${typeDetails.color}`}></div>

             
                <div
                    className={`p-2 m-2 rounded-full ${typeDetails.lightColor} ${typeDetails.textColor} flex-shrink-0 ring-1 ${typeDetails.ringColor}`}
                >
                    {typeDetails.icon}
                </div>

   
                <div className="flex-grow py-2 pr-2">
                    <div className="flex justify-between items-baseline">
                        <h4 className="text-xs font-medium text-gray-800">
                            {notification.title}
                        </h4>
                        <span className="text-xs text-gray-400">
                            {notification.time}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">
                        {notification.message}
                    </p>
                </div>

    
                {notification.dismissible && (
                    <button
                        onClick={() => onNotificationDelete(notification.id)}
                        className="p-1.5 mr-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                        <X size={12} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default NotificationCard
