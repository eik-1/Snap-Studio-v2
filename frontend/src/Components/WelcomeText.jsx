import { useUser } from "@/contexts/UserContext"
import { cn } from "@/lib/utils"
function WelcomeText({ className }) {
    const { user } = useUser()
    if (new Date().getHours() >= 4 && new Date().getHours() < 12) {
        return (
            <div className="h-max w-full flex justify-center">
                {" "}
                <h1
                    className={cn(className)}
                >{`Good Morning ${user?.first_name}`}</h1>
            </div>
        )
    } else if (new Date().getHours() >= 12 && new Date().getHours() < 16) {
        return (
            <div className="h-max w-full flex justify-center">
                <h1
                    className={cn(className)}
                >{`Good Afternoon ${user?.first_name}`}</h1>
            </div>
        )
    } else {
        return (
            <div className="h-max w-full flex justify-center">
                <h1
                    className={cn(className)}
                >{`Good Evening ${user?.first_name}`}</h1>
            </div>
        )
    }
}
export default WelcomeText
