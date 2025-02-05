import { useUser } from "@/contexts/UserContext"
import { apiRequest } from "@/services/utils/apiRequest"
import supabase from "../configs/supabase"

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
        throw error
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

//function to get user subscription details
export async function getUserSub(email) {
    try {
        const response = await apiRequest(
            `/database/get-subscription`,
            "POST",
            { email },
        )
        return response.data.subscription
    } catch (err) {
        throw err
    }
}

export async function changeUserEmail(newEmail) {
    try {
        const { user, error } = await supabase.auth.updateUser({
            email: newEmail,
        })
        if (error) {
            throw error
        }
        return user
    } catch (err) {
        throw err
    }
}

export async function changeUserName(newName) {
    try {
        const { user, error } = await supabase.auth.updateUser({
            data: {
                name: newName,
            },
        })
        if (error) {
            throw error
        }
        return user
    } catch (err) {
        throw err
    }
}
