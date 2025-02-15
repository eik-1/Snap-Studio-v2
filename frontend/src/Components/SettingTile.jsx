import { cn } from "@/lib/utils";
function SettingTile({title="Email", value="abc@example.com", buttons, handlers  })
{
    return(
        <div className="w-full h-14  ">
                <div className="w-full h-full flex items-center justify-between  ">
                    <div className="w-max h-full flex flex-col justify-center">
                            <h2 className="text-base font-medium text-black">
                                {title}
                            </h2>
                            <p className="text-xs text-gray-500">
                                {value}
                            </p>
                    </div>
                    <div className="w-max h-full flex flex-col justify-cente items-end sm:items-start  sm:flex-row-reverse gap-2  sm:gap-4">
                      
                            {buttons?.map((button, index) => (
                                  <div className="w-max h-max">
                            <button className={cn(`text-xs transform transition-all ${button.type==="normal" && 'text-purple-500 hover:text-purple-600'} ${button.type==="destructive" && 'text-rose-500 hover:text-rose-600'} ${button.type==="secondary" && 'text-slate-500 hover:text-slate-700'}`)} key={index}
                            onClick={handlers[button.action]} 
                            >
                              {button.text}
                            </button>
                            </div>))}
                       
                     

                    </div>


                </div>
        </div>
    )
}
export default SettingTile;