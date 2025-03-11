import { getUserModels, startTraining } from "@/services/api/services"
import { createContext, useContext, useEffect, useReducer, useRef } from "react"
import { useUser } from "./UserContext"

const ModelContext = createContext()

const modelState = {
    models: [],
    error: null,
    currentTrainingId: null,
}

const Actions = {
    SET_MODEL: "SET_MODEL",
    ADD_MODEL: "ADD_MODEL",
    ACKNOWLEDGE_MODEL: "ACKNOWLEDGE_MODEL",
    UPDATE_MODEL_STATUS: "UPDATE_MODEL_STATUS",
    SET_CURRENT_TRAINING: "SET_CURRENT_TRAINING",
}

function modelReducer(state, action) {
    switch (action.type) {
        case Actions.SET_MODEL:
            return { ...state, error: null, models: action.payload }
        case Actions.ADD_MODEL:
            return {
                ...state,
                error: null,
                models: [...state.models, action.payload],
            }
        case Actions.ACKNOWLEDGE_MODEL:
            return {
                ...state,
                models: state.models.map((model) =>
                    model.$id === action.payload
                        ? { ...model, statusAcknowledged: true }
                        : model,
                ),
            }
        case Actions.UPDATE_MODEL_STATUS:
            return {
                ...state,
                models: state.models.map((model) =>
                    model.$id === action.payload.modelId
                        ? {
                              ...model,
                              status: action.payload.status,
                              progress: action.payload.progress,
                          }
                        : model,
                ),
            }
        case Actions.SET_CURRENT_TRAINING:
            return {
                ...state,
                currentTrainingId: action.payload,
            }
        default:
            return state
    }
}

function ModelProvider({ children }) {
    const [state, dispatch] = useReducer(modelReducer, modelState)
    const { user } = useUser()
    const eventSourceRef = useRef(null)

    // Function to connect to SSE endpoint
    function connectToSSE(modelId) {
        // Close existing connection if any
        if (eventSourceRef.current) {
            eventSourceRef.current.close()
        }

        // Create new EventSource connection
        const eventSource = new EventSource(`/api/training/events/${modelId}`)

        // Handle incoming messages
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                console.log("SSE message received:", data)

                dispatch({
                    type: Actions.UPDATE_MODEL_STATUS,
                    payload: {
                        modelId: modelId,
                        status: data.status,
                        progress: data.progress,
                    },
                })

                // If training is complete, clean up
                if (
                    data.status === "succeeded" ||
                    data.status === "failed" ||
                    data.status === "canceled"
                ) {
                    eventSource.close()
                    eventSourceRef.current = null
                    dispatch({
                        type: Actions.SET_CURRENT_TRAINING,
                        payload: null,
                    })

                    // Refresh models list
                    fetchModels()
                }
            } catch (error) {
                console.error("Error processing SSE message:", error)
            }
        }

        // Handle connection errors
        eventSource.onerror = (error) => {
            console.error("SSE connection error:", error)

            // Close on error and clean up
            eventSource.close()
            eventSourceRef.current = null

            // Try to reconnect after delay if still training
            if (state.currentTrainingId === modelId) {
                setTimeout(() => {
                    connectToSSE(modelId)
                }, 5000) // 5 second reconnection delay
            }
        }

        // Store the event source in the ref
        eventSourceRef.current = eventSource
    }

    // Cleanup effect for the SSE connection
    useEffect(() => {
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close()
                eventSourceRef.current = null
            }
        }
    }, [])

    // Effect to handle changes to currentTrainingId
    useEffect(() => {
        if (state.currentTrainingId) {
            connectToSSE(state.currentTrainingId)
        } else {
            // Close any existing connection
            if (eventSourceRef.current) {
                eventSourceRef.current.close()
                eventSourceRef.current = null
            }
        }
    }, [state.currentTrainingId])

    // Function to fetch models
    const fetchModels = async () => {
        try {
            if (!user || !user.$id) return

            const models = await getUserModels(user.$id)
            dispatch({ type: Actions.SET_MODEL, payload: models })

            // Check for any ongoing trainings and connect to them
            const ongoingTrainings = models.filter(
                (model) =>
                    model.status === "processing" ||
                    model.status === "starting",
            )

            if (ongoingTrainings.length > 0 && !state.currentTrainingId) {
                // Connect to the first ongoing training
                const trainingToConnect = ongoingTrainings[0]
                dispatch({
                    type: Actions.SET_CURRENT_TRAINING,
                    payload: trainingToConnect.$id,
                })
            }
        } catch (error) {
            console.log("Error fetching models")
        }
    }

    // Fetch models on load and when user changes
    useEffect(() => {
        if (user && user.$id) {
            fetchModels()
        } else {
            // User logged out, clear state
            dispatch({ type: Actions.SET_MODEL, payload: [] })
            dispatch({ type: Actions.SET_CURRENT_TRAINING, payload: null })

            // Close any existing SSE connection
            if (eventSourceRef.current) {
                eventSourceRef.current.close()
                eventSourceRef.current = null
            }
        }
    }, [user])

    async function startModelTraining(data) {
        try {
            const response = await startTraining(data)

            // If the API returns a model ID, set it as the current training
            if (response && response.$id) {
                dispatch({
                    type: Actions.SET_CURRENT_TRAINING,
                    payload: response.$id,
                })
                // Add the new model to the state
                dispatch({ type: Actions.ADD_MODEL, payload: response })
            }
            return response
        } catch (error) {
            console.log("Error starting model training", error)
            throw error
        }
    }

    function acknowledgeModel(modelId) {
        dispatch({ type: Actions.ACKNOWLEDGE_MODEL, payload: modelId })
    }

    // Group models by status
    const trainings = {
        currentCompletedTrainings:
            state?.models?.filter(
                (model) =>
                    model.status === "succeeded" && !model.statusAcknowledged,
            ) || [],
        ongoingTrainings:
            state?.models?.filter(
                (model) =>
                    model.status === "processing" ||
                    model.status === "starting",
            ) || [],
        failedTrainings:
            state?.models?.filter((model) => model.status === "failed") || [],
    }

    return (
        <ModelContext.Provider
            value={{
                trainings,
                state,
                dispatch,
                startModelTraining,
                acknowledgeModel,
                currentTrainingId: state.currentTrainingId,
                isTraining: !!state.currentTrainingId,
                refreshModels: fetchModels,
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
    return context
}

export { ModelProvider, useModel }
