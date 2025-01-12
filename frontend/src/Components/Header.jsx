import NavigationBackButton from "./NavigationBackButton"

function Header() {
    return (
        <header className="flex h-[2.5rem] w-full  bg-white border-[1px] fixed top-0 z-50">
            <div className="flex items-center space-x-3">
                <NavigationBackButton />
            </div>
        </header>
    )
}

export default Header
