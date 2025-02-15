import { CoinsIcon } from "@/data/Icons"
import { useSubscription } from "@/contexts/SubscriptionContext"
import { ClipLoader } from "react-spinners";
function CreditsTab()
{
    const {subscription}= useSubscription();
    return(
        <div className="h-max min-w-16 w-max flex items-center justify-center py-1 px-2 rounded-lg border-[1px] gap-2 cursor-pointer">
            <div className="w-max h-max flex items-center justify-center gap-2">
                <CoinsIcon className="w-5 h-5"/>
            </div>
            <div>
                <p className="text-xs text-gray-500 font-semibold flex items-center justify-center ">
                    {subscription?.credits ? subscription.credits : <ClipLoader size={14} color="grey" />}
                </p>
            </div>
        </div>
    )
}
export default CreditsTab