import { getUserSub } from "@/services/api/services"
import { useQuery } from "@tanstack/react-query"
import { createContext, useContext } from "react"
import { useUser } from "./UserContext"

const SubscriptionContext = createContext()

function SubscriptionProvider({ children }) {
    const { user } = useUser()

    const { data: subscription, error } = useQuery({
        queryKey: ["subscription", user?.email],
        queryFn: () => getUserSub(user?.email),
        enabled: !!user,
    })

    return (
        <SubscriptionContext.Provider value={{ subscription, error }}>
            {children}
        </SubscriptionContext.Provider>
    )
}

function useSubscription() {
    const context = useContext(SubscriptionContext)
    if (context === undefined) {
        throw new Error(
            "useSubscription must be used within a SubscriptionProvider",
        )
    }
    return context
}

export { SubscriptionProvider, useSubscription }
