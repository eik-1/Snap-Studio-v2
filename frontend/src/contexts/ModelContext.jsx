import { useToast } from "@/hooks/use-toast"
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
            console.log("Acknowledging model: ", action.payload)
            return {
                ...state,
                models: state.models.map((model) =>
                    model.$id === action.payload
                        ? { ...model, status_ack: true }
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
    const userId = user?.$id
    const { toast } = useToast()

    // Function to connect to SSE endpoint
async  function connectToSSE(modelId) {
        if (eventSourceRef.current) {
            eventSourceRef.current.close()
        }
        console.log("Connecting to SSE")
        const eventSource = new EventSource(
            `http://localhost:3000/sse/events/${userId}`,
        )
        console.log("Connected to SSE")
        eventSource.onmessage = async (event) => {
            console.log("message from SSE:", event.data)
            try {
                const data = JSON.parse(event.data)
                console.log("message from SSE:", data)

                dispatch({
                    type: Actions.UPDATE_MODEL_STATUS,
                    payload: {
                        modelId: data.model_id,
                        status: data.status,
                    },
                })

                if (
                    data.status === "succeeded" ||
                    data.status === "failed" ||
                    data.status === "canceled"
                ) {
                    eventSource.close()
                    eventSourceRef.current = null
                    toast({
                        title: "Training Completed",
                        description: `Model training  has completed`,
                    })
                    dispatch({
                        type: Actions.SET_CURRENT_TRAINING,
                        payload: null,
                    })

                    await fetchModels()
                }
            } catch (error) {
                console.error("Error processing SSE message:", error)
            }
        }

        eventSource.onerror = (error) => {
            console.error("SSE connection error:", error)

            eventSource.close()
            eventSourceRef.current = null

            if (state.currentTrainingId === modelId) {
                setTimeout(() => {
                    connectToSSE(modelId)
                }, 5000)
            }
        }

        eventSourceRef.current = eventSource
    }

    useEffect(() => {
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close()
                eventSourceRef.current = null
            }
        }
    }, [])

    useEffect(() => {
        console.log("Current Training ID:", state.currentTrainingId)
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

    const fetchModels = async () => {
        try {
            if (!user || !user.$id) return

            const models = await getUserModels(user.$id)
            console.log(models)
            dispatch({ type: Actions.SET_MODEL, payload: models })

            const ongoingTrainings = models.filter(
                (model) =>
                    model.status === "processing" ||
                    model.status === "starting",
            )

            if (ongoingTrainings.length > 0 && !state.currentTrainingId) {
                const trainingToConnect = ongoingTrainings[0]
                console.log("Current Training ID:", state.currentTrainingId)
                dispatch({
                    type: Actions.SET_CURRENT_TRAINING,
                    payload: trainingToConnect.model_id,
                })
            }
        } catch (error) {
            console.log("Error fetching models")
        }
    }

    useEffect(() => {
        if (user && user.$id) {
            fetchModels()
        } else {
            dispatch({ type: Actions.SET_MODEL, payload: [] })
            dispatch({ type: Actions.SET_CURRENT_TRAINING, payload: null })

            if (eventSourceRef.current) {
                eventSourceRef.current.close()
                eventSourceRef.current = null
            }
        }
    }, [user])

    async function startModelTraining(modelData) {
        try {
            const data = await startTraining(modelData)
            console.log(data)

            if (data) {
                console.log("setting current training id")
                dispatch({
                    type: Actions.SET_CURRENT_TRAINING,
                    payload: data.model.model_id,
                })
                dispatch({ type: Actions.ADD_MODEL, payload: data.model })
            }
            return data
        } catch (error) {
            console.log("Error starting model training", error)
            throw error
        }
    }

    function acknowledgeModel(modelId) {
        dispatch({ type: Actions.ACKNOWLEDGE_MODEL, payload: modelId })
    }

    const trainings = {
        currentCompletedTrainings:
            state?.models?.filter(
                (model) => model.status === "succeeded" && !model.status_ack,
            ) || null,
        ongoingTrainings:
            state?.models?.filter(
                (model) =>
                    model.status === "processing" ||
                    model.status === "starting",
            ) || null,
        failedTrainings:
            state?.models?.filter(
                (model) => model.status === "failed" && !model.status_ack,
            ) || null,
    }
    console.log(trainings)

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
