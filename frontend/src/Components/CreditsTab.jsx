import { CoinsIcon } from "@/data/Icons"
import { useSubscription } from "@/contexts/SubscriptionContext"
function CreditsTab()
{
    const {subscription}= useSubscription();
    return(
        <div className="h-max min-w-16 w-max flex items-center justify-center py-1 px-2 rounded-lg border-[1px] gap-2 cursor-pointer">
            <div className="w-max h-max flex items-center justify-center gap-2">
                <CoinsIcon className="w-5 h-5"/>
            </div>
            <div>
                <p className="text-xs text-gray-500 font-semibold">
                    {subscription?.credits}
                </p>
            </div>
        </div>
    )
}
export default CreditsTab