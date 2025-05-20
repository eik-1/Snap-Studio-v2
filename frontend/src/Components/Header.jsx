import Profile from "./Profile"
import Credits from "@/Components/CreditsTab"
import NotificationButton from "@/Components/Notification"
import BackButton from "./BackButton"
import CurrentTabTitle from "./CurrentTabTitle"

function Header() {
    return (
        <header className="flex justify-between h-[3rem]  w-full px-4 fixed top-0 z-[100] ">
            <div className="flex items-center gap-4">
                <BackButton />
                <CurrentTabTitle />
              
            </div>

            <div className="h-full w-max flex gap-3  items-center justify-center p-2  ">
               
                <Credits />
                <NotificationButton />
                <Profile />
            </div>
        </header>
    )
}

export default Header
