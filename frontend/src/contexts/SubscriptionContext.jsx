import { getUserSub } from "@/services/api/services"
import { useQuery, useQueryClient  } from "@tanstack/react-query"
import { createContext, useContext } from "react"
import { useUser } from "./UserContext"

const SubscriptionContext = createContext()

function SubscriptionProvider({ children }) {
    const { user } = useUser()
    const queryClient = useQueryClient();

    const { data: subscription, error } = useQuery({
        queryKey: ["subscription", user?.email],
        queryFn: () => getUserSub(user?.email),
        enabled: !!user,
    })

    function updateCredits(newCredits, email) {
        queryClient.setQueryData(["subscription", email], (oldData) => {
          if (!oldData) return oldData;
          return { ...oldData, credits: newCredits };
        });
      };

    return (
        <SubscriptionContext.Provider value={{ subscription, error, updateCredits }}>
            {children}
        </SubscriptionContext.Provider>
    )
}

function useSubscription() {
    const context = useContext(SubscriptionContext)
  
    return context
}

export { SubscriptionProvider, useSubscription }
