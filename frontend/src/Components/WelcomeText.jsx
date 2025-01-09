import { useUser } from "@/configs/contexts/UserContext"
import { cn } from "@/lib/utils"
function WelcomeText({ className }) {
    const { user } = useUser()
    if (new Date().getHours() >4 && new Date().getHours() < 12) {
        return <h1 className={cn(className)}>{`Good Morning ${user.name}`}</h1>
    } else if (new Date().getHours() > 12  && new Date().getHours() < 16) {
        return (
            <h1 className="text-xl font-semibold ">{`Good Afternoon ${user.name}`}</h1>
        )
    } else {
        return (
            <h1 className="text-xl font-semibold ">{`Good Evening ${user.name}`}</h1>
        )
    }
}
export default WelcomeText
