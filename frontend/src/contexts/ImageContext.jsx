import { useState, createContext, useContext } from "react"

const ImageContext = createContext()

function ImageProvider({ children }) {
    const [generationStatus, setGenerationStatus] = useState({
        status: "idle",
        message: "",
    })
    const [generatedImageUrls, setGeneratedImageUrls] = useState([])
    const [isSaved, setIsSaved] = useState([])
    const [trainingState, setTrainingState] = useState("loading")

    return (
        <ImageContext.Provider
            value={{
                generationStatus,
                setGenerationStatus,
                generatedImageUrls,
                setGeneratedImageUrls,
                isSaved,
                setIsSaved,
                trainingState,
                setTrainingState,
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
