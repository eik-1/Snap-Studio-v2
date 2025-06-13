import {  useNavigate } from "react-router-dom"

import SettingsContainer from "@/Components/SettingsContainer"
import SettingTile from "@/Components/SettingTile"
import { useSubscription } from "@/contexts/SubscriptionContext"
import { useUser } from "@/contexts/UserContext"
import { settings } from "@/data/settings"
import { changeUserEmail, changeUserName } from "@/services/api/services"
import { addOneMonth, addOneYear } from "@/services/utils/date"

function Settings() {
    const { user, setUser } = useUser()
    const { subscription } = useSubscription()
    const navigate = useNavigate()
    const STRIPE_USER_PORTAL = import.meta.env.VITE_STRIPE_USER_PORTAL

    function getBillingDate(cycle) {

        const billingCycle = cycle?.toLowerCase()
        if (billingCycle === "monthly") {
            return addOneMonth(subscription?.start_time)
        } else if (billingCycle=== "yearly") {
            return addOneYear(subscription?.start_time)
        }
    }

    const values = {
        email: user?.email || "--",
        username: user?.first_name + " " + user?.last_name|| "--",
        plan: subscription?.has_subscribed
            ? subscription?.plan_name
            : "Not Subscribed",
        billCycle: subscription?.plan_type || "--",
        billingDate: subscription?.has_subscribed
            ? getBillingDate(subscription?.plan_type)
            : "--",
        password: "************",
    }
    const handlers = {
        updateEmail: () => {
          
            if (user) {
                const newUser = changeUserEmail("newEmail")
                const updatedUser = { ...user, email: newUser.email }
                setUser(updatedUser)
            }
        },
        updateName: () => {
          
            if (user) {
                const newUser = changeUserName("newName") //pass the new name here
                const first_name = newUser.name.split(" ")[0]
                let last_name = newUser.name.split(" ")[1] || ""
                const updatedUser = {
                    ...user,
                    name: newUser.name,
                    first_name,
                    last_name,
                }
                setUser(updatedUser)
            }
        },
        resetPassword: () => {
        
            navigate("/reset-password")
        },
        upgradePlan: () => {
         
            window.location.href=`${import.meta.env.VITE_STRIPE_USER_PORTAL}`
        },
        upgradePlanCycle: () => {
      
            window.location.href=`${import.meta.env.VITE_STRIPE_USER_PORTAL}`
        },
        cancelSubscription: () => {
          
            window.location.href=`${import.meta.env.VITE_STRIPE_USER_PORTAL}`
        }
    }

    return (
       <div className="sm:w-full h-screen flex flex-col   relative overflow-hidden  ">
           

            <div className="md:h-full pt-8 pb-20 sm:pb-4 px-4 flex-grow flex flex-col gap-8 md:overflow-y-scroll   ">
                {settings.map((category, index) => {
                    return (
                        <SettingsContainer
                            key={index}
                            heading={category.heading}
                        >
                            {category.fields.map((setting, index) => {
                                return (
                                    <SettingTile
                                        key={index}
                                        title={setting.title}
                                        name={setting.name}
                                        value={values[setting.name]}
                                        buttons={setting.buttons}
                                        handlers={handlers}
                                        
                                    />
                                )
                            })}
                        </SettingsContainer>
                    )
                })}
            </div>
        </div>
    )
}
export default Settings
