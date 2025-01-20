import NavigationBackButton from "./NavigationBackButton"
import NotificationButton from "./Notification"


function Header() {
   
    return (
        <header className="flex justify-between h-[2.5rem] w-full sm:w-[calc(100dvw-4rem)] sm:ml-16  bg-white border-b-[1px] fixed top-0 z-[80]">
             
            <div className="flex items-center space-x-3">
                <NavigationBackButton />
            </div>

            <div className="h-max w-max">
                <NotificationButton/>
            </div>
          



        </header>
    )
}

export default Header
