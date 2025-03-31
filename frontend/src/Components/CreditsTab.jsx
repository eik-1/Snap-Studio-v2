import { RotatingLines } from "react-loader-spinner"

import { useSubscription } from "@/contexts/SubscriptionContext"
import { CoinsIcon } from "@/data/Icons"
import {useState, useEffect, useRef} from "react"
import { Plus, Camera, Shirt, Box, CreditCard } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

function Credits() {
    const { subscription } = useSubscription()
   
    const [isVisible, setIsVisible] = useState(false)
    const creditsTabRef = useRef(null)

    function handleClickOutside(e) {
        if (
            creditsTabRef.current &&
            !creditsTabRef.current.contains(e.target)
        ) {
            
            setIsVisible(false)
        }
    }
    useEffect(() => {
        
        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isVisible])


    return (
        <div className="h-max min-w-16 w-max flex items-center justify-center py-1 px-2 rounded-lg border-[1px] gap-2 cursor-pointer relative font-sans"
            onClick={() => setIsVisible(!isVisible)}
            ref={creditsTabRef}
        >
            <div className="w-max h-max flex items-center justify-center gap-2">
                <CoinsIcon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs text-gray-500 font-semibold flex items-center justify-center ">
                    {typeof subscription?.credits !== "undefined" ? (
                        subscription.credits
                    ) : (
                        <RotatingLines
                            strokeWidth="4"
                            animationDuration="0.75"
                            strokeColor="grey"
                            height="16"
                            width="16"
                        />
                    )}
                </p>
            </div>
            <AnimatePresence>

           
            {isVisible && (
                <CreditsTab/>
       
      )}
       </AnimatePresence>
        </div>
    )
}
function CreditsTab() {
    const { subscription } = useSubscription();

  
    
    const maxImageCredits = subscription?.plan_name === 'Basic' 
      ? (subscription?.plan_type === 'Yearly' ? 12000 : 1000)
      : subscription?.plan_name === 'Pro'
        ? (subscription?.plan_type === 'Yearly' ? 60000 : 5000)
        : 0;
        
    const maxFashionCredits = subscription?.plan_name === 'Pro'
      ? (subscription?.plan_type === 'Yearly' ? 3000 : 250)
      : 0;
      
    const maxModels = subscription?.plan_name === 'Basic' ? 1 : subscription?.plan_name === 'Pro' ? 3 : 0;
    
    const imageCredits = subscription?.credits || 0;
    const fashionCredits = subscription?.fashion_credits || 0;
    const modelsRemaining = subscription?.model_credits || 0;
  
    return (
      <motion.div 
        className="absolute  -right-10 sm:right-0 top-12 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-10 overflow-hidden animate-fadeIn"
        initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
       
        <div className="bg-gradient-to-br from-rose-50/50 to-purple-50/20 px-6 py-4  rounded-lg">
          <div className="flex items-center gap-4 ">
            <div>
              <CoinsIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-black">Credit Balance</h3>
              <p className="text-xs text-black/90 mt-1">
                {subscription?.plan_name?.charAt(0).toUpperCase() + subscription?.plan_name?.slice(1) || 'No'} | {subscription?.plan_type || ''} 
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-2">
          <div className="space-y-4">
            {/* Image credits */}
            <div className="flex items-center py-2">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center border-indigo-200">
                <Camera size={18} className="text-gray-500" />
              </div>
              <div className="ml-3 flex-1">
                <span className="text-sm font-medium text-gray-700">Image Credits</span>
                <div className="mt-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-500">
                      {imageCredits.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">
                      {maxImageCredits.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" 
                      style={{ width: `${Math.min(100, (imageCredits / maxImageCredits) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {(subscription!==undefined && subscription?.plan_name==='Pro') && (
              <div className="flex items-center py-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-purple-200">
                  <Shirt size={18} className="text-gray-500" />
                </div>
                <div className="ml-3 flex-1">
                  <span className="text-sm font-medium text-gray-700">Fashion Credits</span>
                  <div className="mt-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-500">
                        {fashionCredits.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400">
                        {maxFashionCredits.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" 
                        style={{ width: `${Math.min(100, (fashionCredits / maxFashionCredits) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Models remaining */}
            <div className="flex items-center py-2 rounded-lg">
              <div className="w-10 h-10 rounded-full border flex items-center justify-center border-emerald-200">
                <Box size={18} className="text-gray-500" />
              </div>
              <div className="ml-3 flex-1">
                <span className="text-sm font-medium text-gray-700">Models Remaining</span>
                <div className="mt-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-500">
                      {modelsRemaining}
                    </span>
                    <span className="text-xs text-gray-400">
                      {maxModels}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" 
                      style={{ width: `${Math.min(100, (modelsRemaining / maxModels) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
     
        <div className="bg-gradient-to-bl from-purple-50/20 to-rose-50/50 px-4 py-3  rounded-lg">
          <div className="flex items-center gap-2">
            <button className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white transition-all"
            onClick={() => {window.location.href=`${import.meta.env.VITE_STRIPE_USER_PORTAL}`}}
            >
              {subscription?.plan_name === 'Pro' ? 'Manage' : 'Upgrade'} Plan
            </button>
           
          </div>
        </div>
      </motion.div>
    );
  }

export default Credits
