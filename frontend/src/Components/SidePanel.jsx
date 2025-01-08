function SidePanel({children})
{
    return(
        <div className="h-full w-1/3 flex bg-blue-500 sm:w-[24rem] z-10  top-0 border-r-[1px] overflow-y-auto">
            {children}
        </div>
    )
}
export default SidePanel