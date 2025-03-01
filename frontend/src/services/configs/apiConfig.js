import supabase from "./supabase"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export async function getApiConfig() {
    const token = await getToken()
    return {
        baseUrl: BASE_URL,
        defaultHeaders: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
}

async function getToken() {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
        console.error("Error getting session", error)
        return null
    }
    if (!data.session.access_token) {
        await supabase.auth.refreshSession()
        const { data: refreshedData, error: refreshedError } =
            await supabase.auth.getSession()
        if (refreshedError) {
            console.error("Error refreshing session", refreshedError)
            return null
        }
        console.log("Refreshed Session Data:", refreshedData)
        return refreshedData.session?.access_token
    }
    console.log("Session Data:", data)
    return data.session?.access_token
}
