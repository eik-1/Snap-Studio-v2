import { useUser } from "@/contexts/UserContext"
import { cn } from "@/lib/utils"

function WelcomeText({ className }) {
    const { user } = useUser()
    const userName= user?.first_name || 'user'
    if(new Date().getHours() >= 0 && new Date().getHours() <4) {
        return (
            <div className="h-max w-full flex justify-center">
                {" "}
                <h1
                    className={cn(className)}
                >{`Happy late night, ${userName}`}</h1>
            </div>
        )

    }
    if(new Date().getHours() >= 4 && new Date().getHours() < 6) {
        return(
            <div className="h-max w-full flex justify-center">
                {" "}
                <h1
                    className={cn(className)}
                >{`Happy early morning, ${userName}`}</h1>
            </div>
        )

    }
    else if (new Date().getHours() >= 6 && new Date().getHours() < 12) {
        return (
            <div className="h-max w-full flex justify-center">
                {" "}
                <h1
                    className={cn(className)}
                >{`Good Morning, ${userName}`}</h1>
            </div>
        )
    } else if (new Date().getHours() >= 12 && new Date().getHours() < 16) {
        return (
            <div className="h-max w-full flex justify-center">
                <h1
                    className={cn(className)}
                >{`Good Afternoon ${userName}`}</h1>
            </div>
        )
    } else {
        return (
            <div className="h-max w-full flex justify-center">
                <h1
                    className={cn(className)}
                >{`Good Evening ${userName}`}</h1>
            </div>
        )
    }
}
export default WelcomeText
