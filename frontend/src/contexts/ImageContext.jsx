import { createContext, useContext, useReducer, useState } from "react"

const ImageContext = createContext()
const imageState = {
    mode: "none",
    generationStatus: {
        status: "idle",
        message: "",
    },
    generatedImageUrls: [],
}

const Actions = {
    SET_MODE: "SET_MODE",
    SET_GENERATION_STATUS: "SET_GENERATION_STATUS",
    START_GENERATION: "START_GENERATION",
    SET_GENERATED_IMAGE_URLS: "SET_GENERATED_IMAGE_URLS",
}

function generationReducer(state, action) {
    switch (action.type) {
        case Actions.SET_MODE:
            return { ...state, mode: action.payload }
        case Actions.START_GENERATION:
            return {
                ...state,
                generationStatus: {
                    status: "generating",
                    message: "Generating Images",
                },
            }
        case Actions.SET_GENERATION_STATUS:
            return { ...state, generationStatus: action.payload }
        case Actions.SET_GENERATED_IMAGE_URLS:
            return { ...state, generatedImageUrls: [...action.payload] }
        default:
            return state
    }
}

function ImageProvider({ children }) {
    const [generationStatus, setGenerationStatus] = useState({
        status: "idle",
        message: "",
    })
    const [imageUrls, setImageUrls] = useState([]) //these are old state old variables they are currently not in use,
    const [isSaved, setIsSaved] = useState([]) //for all the image urls we are using state.generatedImageUrls
    const [trainingState, setTrainingState] = useState("loading")
    const [state, dispatch] = useReducer(generationReducer, imageState)

    return (
        <ImageContext.Provider
            value={{
                generationStatus,
                setGenerationStatus,
                imageUrls,
                setImageUrls,
                isSaved,
                setIsSaved,
                trainingState,
                setTrainingState,
                state,
                dispatch,
            }}
        >
            {children}
        </ImageContext.Provider>
    )
}
function useImage() {
    const context = useContext(ImageContext)
    if (context === undefined) {
        throw new Error("useImage must be used within a ImageProvider")
    }
    return context
}

export { ImageContext, ImageProvider, useImage }
