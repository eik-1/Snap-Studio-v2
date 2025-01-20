import { generateImage } from "@/services/api/apiReq"
import { useQuery } from "@tanstack/react-query"
import { createContext, useContext, useReducer, useState } from "react"

const ImageContext = createContext()
const initialState = {
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
        default:
            return state
    }
}

function ImageProvider({ children }) {
    const [generationStatus, setGenerationStatus] = useState({
        status: "idle",
        message: "",
    })
    const [imageUrls, setImageUrls] = useState([])
    const [isSaved, setIsSaved] = useState([])
    const [trainingState, setTrainingState] = useState("loading")
    const [state, dispatch] = useReducer(generationReducer, initialState)

    async function handleImageGeneration(userId, modelName, prompt, numImages) {
        dispatch({ type: Actions.START_GENERATION })
        const generatedImages = await generateImage(
            userId,
            modelName,
            prompt,
            numImages,
        )
        setImageUrls(generatedImages)
        setGenerationStatus({
            status: "success",
            message: "Images generated successfully",
        })
    }

    return (
        <ImageContext.Provider
            value={{
                generationStatus,
                setGenerationStatus,
                imageUrls,
                setImageUrls,
                isSaved,
                handleImageGeneration,
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
