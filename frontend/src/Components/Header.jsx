import NavigationBackButton from "./NavigationBackButton"
import Profile from "./Profile"
import TrainingStatus from "@/Components/TrainingStatus"
import CreditsTab from "@/Components/CreditsTab"
import NotificationButton from "@/Components/Notification"

function Header() {
    return (
        <header className="flex justify-between h-[3rem] w-full sm:w-[calc(100dvw-4rem)] sm:ml-16  bg-white border-b-[1px]  fixed top-0 z-[80]">
            <div className="flex items-center space-x-3">
                <NavigationBackButton />
            </div>

            <div className="h-full w-max flex gap-4 sm:gap-6 mr-4 items-center justify-center p-2  ">
               
                <CreditsTab />
                <NotificationButton />
                <Profile />
            </div>
        </header>
    )
}

export default Header
