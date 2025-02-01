import SettingsContainer from "@/Components/SettingsContainer"
import SettingTile from "@/Components/SettingTile"
import { settings } from "@/data/settings"
import { useUser } from "@/contexts/UserContext"
import { useSubscription } from "@/contexts/SubscriptionContext"
import { addOneMonth, addOneYear } from "@/services/utils/date"
function Settings() {
    const { user } = useUser()
    const { subscription } = useSubscription()
    console.log(subscription)
    function getBillingDate(cycle) {
        if (cycle === "monthly") {
            return addOneMonth(subscription?.start_time)
        } else if (cycle === "Yearly") {
            return addOneYear(subscription?.start_time)
        }
    }
    const values = {
        email: user?.email,
        username: user?.first_name + " " + user?.last_name,
        plan: subscription?.has_subscribed
            ? subscription?.plan_name
            : "Not Subscribed",
        billCycle: subscription?.plan_type || "--",
        billingDate: subscription?.has_subscribed
            ? getBillingDate(subscription?.plan_type)
            : "--",
        password: "************",
    }
    const handlers={
    
        updateEmail: () => {
            console.log("update email")  //to be implemented
        },
        updateName: () => {
            console.log("update name")
        },
        updatePassword: () => {
            console.log("update password")
        },
        resetPassword: () => {
            console.log("reset password")
        },
        upgradePlan: () => {
            console.log("upgrade plan")
        },
    }

    return (
        <div className="w-full h-full bg-white   relative flex flex-col md:flex-row md:items-center overflow-y-scroll md:overflow-y-visible custom-scrollbar gap-6">
            <div className="w-[95%] flex-shrink-0  mx-auto md:mx-0 h-36 md:h-[95%] md:my-auto md:w-80   border-b-[1px] md:border-r-[1px] md:border-b-0 border-neutral-200 md:border-b-none ">
                <div className="flex flex-col  items-center mt-10 md:mt-32 gap-2 ">
                    <h2 className="text-3xl leading-relaxed text-center font-semibold bg-clip-text text-transparent  bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500">
                        Settings
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Change your Account Settings
                    </p>
                </div>
            </div>

            <div className="md:h-full pt-8 pb-20 sm:pb-4 px-4 flex-grow flex flex-col gap-8 md:overflow-y-scroll custom-scrollbar   ">
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
