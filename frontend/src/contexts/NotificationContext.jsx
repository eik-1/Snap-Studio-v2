import { acknowledgeNotification } from "@/services/api/services"
import { createContext, useContext, useEffect, useReducer } from "react"
import { useModel } from "./ModelContext"
import { useUser } from "./UserContext"

const NotificationContext = createContext()

const initialState = {
    notifications: [],
}

const Actions = {
    SET_NOTIFICATIONS: "SET_NOTIFICATIONS",
    DELETE_NOTIFICATION: "DELETE_NOTIFICATION",
}

function notificationReducer(state, action) {
    switch (action.type) {
        case Actions.SET_NOTIFICATIONS:
            return { ...state, notifications: action.payload }
        case Actions.DELETE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification) => notification.id !== action.payload,
                ),
            }
        default:
            return state
    }
}

function NotificationProvider({ children }) {
    const [state, dispatch] = useReducer(notificationReducer, initialState)
    const { user } = useUser()
    const { trainings } = useModel()

    async function onNotificationDelete(notificationId) {
        const userId = user?.$id
        await acknowledgeNotification(notificationId, userId)
        dispatch({ type: Actions.DELETE_NOTIFICATION, payload: notificationId })
    }

    useEffect(() => {
        const newNotifications = []

        trainings?.ongoingTrainings?.forEach((training) => {
            const notification = {
                id: training.$id,
                type: "info",
                title: "New Training Started",
                message: `Training for model ${training.model_name} has started`,
                time: new Date().toLocaleString(),
                dismissible: true,
            }
            newNotifications.push(notification)
        })
        trainings?.failedTrainings?.forEach((training) => {
            const notification = {
                id: training.$id,
                type: "error",
                title: "Training Failed",
                message: `Training for model ${training.model_name} has failed`,
                time: new Date().toLocaleString(),
                dismissible: true,
            }
            newNotifications.push(notification)
        })
        trainings?.currentCompletedTrainings?.forEach((training) => {
            const notification = {
                id: training.model_id,
                type: "success",
                title: "Training Completed",
                message: `Training for model ${training.model_name} has completed`,
                time: new Date().toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                }),
                createdAt: training.created_at,
                dismissible: true,
            }
            newNotifications.push(notification)
            newNotifications.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            )
            console.log({ newNotifications })
        })
        dispatch({
            type: Actions.SET_NOTIFICATIONS,
            payload: newNotifications,
        })
    }, [trainings])

    return (
        <NotificationContext.Provider
            value={{ state, dispatch, onNotificationDelete }}
        >
            {children}
        </NotificationContext.Provider>
    )
}
function useNotification() {
    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error(
            "useNotification must be used within a NotificationProvider",
        )
    }
    return context
}

export { NotificationProvider, useNotification }
