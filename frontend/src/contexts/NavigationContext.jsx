import { createContext, useContext, useReducer } from "react"

const NavigationContext = createContext()

const initialNavigationState = {
    tabs: ["options"],
    previousTab: null,
}

const navigationReducer = (state, action) => {
    switch (action.type) {
        case "SET_TAB":
            return {
                tabs: [...state.tabs, action.payload.tab],
                previousTab: state.tabs[state.tabs.length - 1],
            }
        case "REMOVE_TAB":
            return {
                tabs: state.tabs.slice(0, state.tabs.length - 1),
                previousTab: state.tabs[state.tabs.length - 3] || null,
            }
        default:
            return state
    }
}

const NavigationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        navigationReducer,
        initialNavigationState,
    )

    return (
        <NavigationContext.Provider value={{ state, dispatch }}>
            {children}
        </NavigationContext.Provider>
    )
}
function useNavigation() {
    const context = useContext(NavigationContext)
    if (context === undefined) {
        throw new Error("useNavigation must be used within a ImageProvider")
    }
    return context
}
export { NavigationProvider, useNavigation }
