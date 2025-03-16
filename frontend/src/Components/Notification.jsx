import { useNotification } from "@/contexts/NotificationContext"
import { BellIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import NotificationCard from "./NotificationCard"

// const notifications = [
//     {
//         id: 1,
//         type: "info",
//         title: "New Update Available",
//         message:
//             "Version 2.4.0 includes performance improvements and bug fixes",
//         time: "2 min ago",
//         isNew: true,
//         hasAction: true,
//         actionLabel: "Update Now",
//         image: null,
//         dismissible: true,
//     },
//     {
//         id: 2,
//         type: "success",
//         title: "Payment Processed",
//         message: "Your subscription has been renewed successfully",
//         time: "10 min ago",
//         isNew: true,
//         hasAction: false,
//         actionLabel: null,
//         image: null,
//         dismissible: true,
//     },
//     {
//         id: 3,
//         type: "warning",
//         title: "Storage Almost Full",
//         message: "You've used 85% of your available storage space",
//         time: "1 hour ago",
//         isNew: false,
//         hasAction: true,
//         actionLabel: "Manage Storage",
//         image: null,
//         dismissible: true,
//     },
//     {
//         id: 4,
//         type: "error",
//         title: "Connection Failed",
//         message: "Unable to connect to the server. Please check your network",
//         time: "3 hours ago",
//         isNew: false,
//         hasAction: true,
//         actionLabel: "Retry",
//         image: null,
//         dismissible: true,
//     },
//     {
//         id: 5,
//         type: "default",
//         title: "New Message",
//         message: "Sarah sent you a message about the project deadline",
//         time: "Yesterday",
//         isNew: false,
//         hasAction: true,
//         actionLabel: "View Message",
//         image: null,
//         dismissible: true,
//     },
//     {
//         id: 6,
//         type: "info",
//         title: "Meeting Reminder",
//         message: "Team standup in 15 minutes",
//         time: "15 min ago",
//         isNew: true,
//         hasAction: true,
//         actionLabel: "Join Now",
//         image: null,
//         dismissible: true,
//     },
//     {
//         id: 7,
//         type: "success",
//         title: "Task Completed",
//         message: "Dashboard redesign has been marked as complete",
//         time: "4 hours ago",
//         isNew: false,
//         hasAction: false,
//         actionLabel: null,
//         image: null,
//         dismissible: true,
//     },
//     {
//         id: 8,
//         type: "warning",
//         title: "Certificate Expiring",
//         message: "Your SSL certificate will expire in 7 days",
//         time: "2 days ago",
//         isNew: false,
//         hasAction: true,
//         actionLabel: "Renew Now",
//         image: null,
//         dismissible: true,
//     },
//     {
//         id: 9,
//         type: "error",
//         title: "Failed Deployment",
//         message: "The latest deployment to production failed",
//         time: "30 min ago",
//         isNew: true,
//         hasAction: true,
//         actionLabel: "View Logs",
//         image: null,
//         dismissible: true,
//     },
//     {
//         id: 10,
//         type: "default",
//         title: "New Feature Available",
//         message: "Try out our new analytics dashboard",
//         time: "5 days ago",
//         isNew: false,
//         hasAction: true,
//         actionLabel: "Explore",
//         image: null,
//         dismissible: true,
//     },
// ]

function NotificationTray({ isVisible = false }) {
    const { state: notificationState } = useNotification()
    return (
        <motion.div
            className="absolute z-30 top-12 -right-8 sm:right-2 w-[20rem] h-[30rem] border-[1px] bg-gradient-to-br from-purple-50/90 to-pink-50/90 backdrop-blur-xl shadow-md rounded-xl p-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
            <div className="flex justify-between border-b-[1px] pb-2">
                <div className="flex items-center gap-2">
                    <BellIcon className="w-4 h-4 text-gray-500" />
                    <h2 className="text-lg font-medium">Notifications</h2>
                </div>
                <button className="text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-2 rounded-md transition-all">
                    Clear All
                </button>
            </div>
            <div className="flex flex-col gap-1 pt-4 -mx-4  overflow-y-auto px-4    h-[25rem]">
                {notificationState?.notifications.map((notification) => (
                    <NotificationCard
                        key={notification.id}
                        notification={notification}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default function NotificationButton() {
    const [notificationTrayOpen, setNotificationTrayOpen] = useState(false)
    const notificationTrayRef = useRef(null)

    function handleClickOutside(e) {
        if (
            notificationTrayRef.current &&
            !notificationTrayRef.current.contains(e.target)
        ) {
            setNotificationTrayOpen(false)
        }
    }
    useEffect(() => {
        if (notificationTrayOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [notificationTrayOpen])
    return (
        <div className="h-max w-max flex relative ">
            <div
                className="h-max w-max  text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-75"
                onClick={() => {
                    setNotificationTrayOpen((prev) => !prev)
                }}
            >
                <BellIcon size={20} />
            </div>
            <div className="absolute top-2 right-3 bg-green-400 shadow-md  w-[6px] h-[6px] rounded-full"></div>
            <AnimatePresence>
                {notificationTrayOpen && (
                    <>
                        <NotificationTray isVisible={true} />
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
