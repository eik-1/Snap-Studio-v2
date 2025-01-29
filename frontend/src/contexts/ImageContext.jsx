import { createContext, useContext, useReducer } from "react"

const ImageContext = createContext()
const tempData=["https://replicate.delivery/xezq/cskuEt2q4FqjPh62OQNR0vGmycS1XQvpBD6YCPQTJuxjevEKA/out-0.webp","https://replicate.delivery/xezq/cskuEt2q4FqjPh62OQNR0vGmycS1XQvpBD6YCPQTJuxjevEKA/out-0.webp","https://replicate.delivery/xezq/cskuEt2q4FqjPh62OQNR0vGmycS1XQvpBD6YCPQTJuxjevEKA/out-0.webp", "https://replicate.delivery/xezq/cskuEt2q4FqjPh62OQNR0vGmycS1XQvpBD6YCPQTJuxjevEKA/out-0.webp", "https://replicate.delivery/xezq/cskuEt2q4FqjPh62OQNR0vGmycS1XQvpBD6YCPQTJuxjevEKA/out-0.webp"]
const imageState = {
    mode: "none",
    generationStatus: {
        status: "idle",
        message: "",
    },
    generatedImageUrls: [...tempData]
        
    ,
}

const Actions = {
    SET_MODE: "SET_MODE",
    SET_GENERATION_STATUS: "SET_GENERATION_STATUS",
    SET_GENERATED_IMAGE_URLS: "SET_GENERATED_IMAGE_URLS",
}

function imageReducer(state, action) {
    switch (action.type) {
        case Actions.SET_MODE:
            return { ...state, mode: action.payload }
        case Actions.SET_GENERATION_STATUS:
            return { ...state, generationStatus: action.payload }
        case Actions.SET_GENERATED_IMAGE_URLS:
            return { ...state, generatedImageUrls: [...action.payload] }
        default:
            return state
    }
}

function ImageProvider({ children }) {
   
    const [state, dispatch] = useReducer(imageReducer, imageState)

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
