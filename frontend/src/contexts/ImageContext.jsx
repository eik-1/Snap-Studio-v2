import { createContext, useContext, useReducer } from "react"

const ImageContext = createContext()
const tempData = [
 
  
]
const imageState = {
    mode: "headshot",
    generationStatus: {
        status: "idle",
        message: "",
    },
    generatedImageUrls: [...tempData],
    imageSaveStatus:{},
    savedImages:[],
}

const Actions = {
    SET_MODE: "SET_MODE",
    SET_GENERATION_STATUS: "SET_GENERATION_STATUS",
    SET_GENERATED_IMAGE_URLS: "SET_GENERATED_IMAGE_URLS",
    SET_IMAGE_SAVE_STATUS: "SET_IMAGE_SAVE_STATUS",
    SET_IMAGE_DELETE_STATUS: "SET_IMAGE_DELETE_STATUS",
    SET_SAVED_IMAGES: "SET_SAVED_IMAGES",
    RESET_SAVED_IMAGES: "RESET_SAVED_IMAGES",
}

function imageReducer(state, action) {
    switch (action.type) {
        case Actions.SET_MODE:
            return { ...state, mode: action.payload }
        case Actions.SET_GENERATION_STATUS:
            return { ...state, generationStatus: action.payload }
        case Actions.SET_GENERATED_IMAGE_URLS:
            return { ...state, generatedImageUrls: [...action.payload] }
        case Actions.SET_IMAGE_SAVE_STATUS:
            return { ...state, imageSaveStatus: {
                ...state.imageSaveStatus,
                [action.payload.url]: action.payload.status
            }}
        case Actions.SET_SAVED_IMAGES:
            return { ...state, savedImages: [...action.payload] }
        case Actions.RESET_SAVED_IMAGES:
            return { ...state, savedImages: [] }
        case Actions.SET_IMAGE_DELETE_STATUS:
            return {
                ...state,
                savedImages: state.savedImages.map((image) => {
                    if (image.imageUrl === action.payload.url) {
                        return { ...image, deleteState: action.payload.status }
                    }
                    return image
            })}
        default:
            return state
    }
}

function ImageProvider({ children }) {
    const [state, dispatch] = useReducer(imageReducer, imageState)
    console.log(state.mode)
    return (
        <ImageContext.Provider
            value={{
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
