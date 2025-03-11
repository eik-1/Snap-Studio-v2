function SettingsContainer({ children, heading }) {
    return (
        <div className="w-full h-max flex flex-col gap-4">
            <div className="w-full h-max text-black pl-2  ">
                <h2 className="text-xl font-medium text-left leading-none">
                    {heading}
                </h2>
            </div>
            <div className="w-full h-max  relative flex flex-col items-center py-8 px-8  rounded-lg  border-[1px] shadow-sm">
                <div className="w-full h-full flex flex-col gap-8">
                    <div className="w-full h-max flex flex-col gap-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SettingsContainer
