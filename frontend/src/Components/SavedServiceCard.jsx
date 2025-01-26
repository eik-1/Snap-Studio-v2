import { cn } from "@/lib/utils"

function SavedServiceCard({serviceName="Saved headshot", Icon, className})
{
    return(
        <div className={cn(`w-[12rem] sm:w-[14rem] h-[12rem] sm:h-[14rem] px-6 sm:px-6 pb-8 sm:pb-12 rounded-2xl bg-blue-500 relative flex items-end sm:text-2xl hover:scale-105 transition-all duration-300 ${className} cursor-pointer`)}>
            <div className="absolute top-2 right-2">
             
            </div>
            <div className="w-full h-max flex flex-col gap-4">
                <Icon className="w-8 h-8" />
                <h2 className="font-semibold ">
                   <span className="block">
                   Saved&nbsp;
                    </span>
                    <span className="block">
                    {serviceName}
                    </span>
                   
                </h2>
            </div>
        </div>
    )
}
export default SavedServiceCard