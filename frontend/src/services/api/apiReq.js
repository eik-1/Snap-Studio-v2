import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export async function getUserModels(userId) {
    const response = await axios.get(`${BASE_URL}/database/user-models`, {
        headers: {
            userId: userId,
        },
    })
    console.log(response)
    if (response.status === 500) {
        console.log("Error fetching user models")
    }
    return response.data.data.models
}

export async function generateImage(userId, modelName, prompt, numberOfImages) {
    const response = await axios.post(`${BASE_URL}/models/run`, {
        userId,
        modelName,
        prompt,
        numberOfImages,
    })
    // response is an array of image urls
    if (response.status === 500) {
        console.log("Error generating image")
    }
    return response.data.output
}
