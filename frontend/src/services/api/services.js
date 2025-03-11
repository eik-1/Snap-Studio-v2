import { apiRequest } from "@/services/utils/apiRequest"
import supabase from "../configs/supabase"

//function to start model training
export async function startTraining(data) {
    try {
        const response = await apiRequest(`/models/train`, "POST", data, {
            "Content-Type": "multipart/form-data",
        })
        return response
    } catch (error) {
        throw error
    }
}

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
export async function generateImage(
    userId,
    modelName,
    prompt,
    numberOfImages,
    userEmail,
) {
    const response = await apiRequest(`/models/run`, "POST", {
        userId,
        modelName,
        prompt,
        numberOfImages,
        userEmail,
    })
    return response.data //response is an array of image urls
}

export async function generateHeadshot(
    userId,
    modelName,
    numberOfImages,
    style,
    userEmail,
) {
    const response = await apiRequest(`/models/run-headshots`, "POST", {
        userId,
        modelName,
        numberOfImages,
        style,
        userEmail,
    })
    return response.data
}

export async function saveHeadshot(userId, fileUrl) {
    const response = await apiRequest(`/database/save-headshot-image`, "POST", {
        userId,
        fileUrl,
    })
    return response.data
}

export async function saveCustomImage(userId, fileUrl) {
    const response = await apiRequest(`/database/save-image`, "POST", {
        userId,
        fileUrl,
    })
    return response.data
}

export async function getSavedHeadshots(userId) {
    const response = await apiRequest(`/database/get-saved-headshots`, "POST", {
        userId,
    })
    return response.data.imageUrls
}

export async function getSavedImages(userId) {
    const response = await apiRequest(`/database/get-saved-images`, "POST", {
        userId,
    })
    return response.data.imageUrls
}

export async function deleteSavedImage(userId, imageUrl) {
    const response = await apiRequest(`/database/delete-image`, "POST", {
        userId,
        imageUrl,
    })
    return response
}

//function to get user subscription details
export async function getUserSub(email) {
    try {
        const response = await apiRequest(
            `/database/get-subscription`,
            "POST",
            { email },
        )
        console.log("Sub data: ", response.data.subscription)
        return response.data.subscription
    } catch (err) {
        throw err
    }
}

export async function changeUserEmail(newEmail) {
    try {
        const { data, error } = await supabase.auth.updateUser({
            email: newEmail,
        })
        if (error) {
            throw error
        }
        return data.user
    } catch (err) {
        throw err
    }
}

export async function changeUserName(firstName, lastName) {
    try {
        const { data, error } = await supabase.auth.updateUser({
            data: {
                first_name: firstName,
                last_name: lastName,
            },
        })
        console.log(data)
        if (error) {
            throw error
        }
        return data.user
    } catch (err) {
        throw err
    }
}
