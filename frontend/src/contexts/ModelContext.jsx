import { createContext, useContext, useEffect, useReducer } from "react"
import { getUserModels } from "@/services/api/imageService"
import { useUser } from "./UserContext"
import useSSE from "@/hooks/useSSE"
const ModelContext = createContext()

const modelState = {
    models: [],
    error: null,
}

const Actions = {
    SET_MODEL: "SET_MODEL",
    ADD_MODEL: "ADD_MODEL",
    ACKNOWLEDGE_MODEL: "ACKNOWLEDGE_MODEL",
}

function modelReducer(state, action) {
    switch (action.type) {
        case Actions.SET_MODEL:
            return { error: null, models: action.payload }
        case Actions.ADD_MODEL:
            return { error: null, models: [...state, action.payload] }
        case Actions.ACKNOWLEDGE_MODEL:
            return  // need to be implemented
        default:
            return state
    }
}
function ModelProvider({ children }) {
    const [state, dispatch] = useReducer(modelReducer, modelState)
    const { user } = useUser()
        
       useEffect(() => {
        const fetchModels = async () => {
            try {
                const models = await getUserModels(user.$id)
                dispatch({ type: "SET_MODEL", payload: models })
            } catch (error) {
                console.log("Error fetching models")
            }
        }
        fetchModels()
    }, [user])
    const currentTrainings =
        state?.models?.filter((model) => model.status === "succeeded") || [] //placeholder expression, to be replaced with actual logic
    console.log(currentTrainings)
    console.log(state)
    return (
        <ModelContext.Provider
            value={{
                currentTrainings,
                state,
                dispatch,
            }}
        >
            {children}
        </ModelContext.Provider>
    )
}
function useModel() {
    const context = useContext(ModelContext)
    if (context === undefined) {
        throw new Error("useModel must be used within a ModelProvider")
    }
    return useContext(ModelContext)
}
export { ModelProvider, useModel }
