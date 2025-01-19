import NavigationBackButton from "./NavigationBackButton"
import NotificationButton from "./Notification"

function Header() {
    return (
        <header className="flex justify-between h-[2.5rem] w-full sm:w-[calc(100dvw-4rem)] ml-16  bg-white border-[1px] fixed top-0 z-[100]">
            <div className="flex items-center space-x-3">
                <NavigationBackButton />
            </div>
            <div className="h-max w-max mr-16">
                <NotificationButton/>
            </div>
        </header>
    )
}

export default Header
