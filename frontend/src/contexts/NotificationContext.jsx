import { useContext, createContext, useEffect, useReducer } from "react"
import { useUser } from "./UserContext"
import { useModel } from "./ModelContext"

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
                id: training.$id,
                type: "success",
                title: "Training Completed",
                message: `Training for model ${training.model_name} has completed`,
                time: new Date().toLocaleString(),
                dismissible: true,
            }
            newNotifications.push(notification)
        })
        dispatch({
            type: Actions.SET_NOTIFICATIONS,
            payload: newNotifications,
        })
    }, [trainings])

    return (
        <NotificationContext.Provider value={{ state, dispatch }}>
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
