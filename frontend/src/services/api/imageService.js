import { apiRequest } from "@/services/utils/apiRequest"

//function to get all models created by the user
export async function getUserModels(userId) {
    try {
        const response = await apiRequest(
            `/database/user-models`,
            "GET",
            {},
            {
                userId: userId,
            },
        )
        console.log(response.data.models)
        return response.data.models
    } catch (error) {
        console.log("Error fetching user models")
    }
}

//function to generate custom images
export async function generateImage(userId, modelName, prompt, numberOfImages) {
    const response = await apiRequest(`/models/run`, "POST", {
        userId,
        modelName,
        prompt,
        numberOfImages,
    })
    return response.data.output //response is an array of image urls
}
