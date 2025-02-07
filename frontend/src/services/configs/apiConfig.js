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
    // const storageKey = `sb-${SUPABASE_PROJECT_ID}-auth-token`
    // const sessionDataString = localStorage.getItem(storageKey)
    // const sessionData = JSON.parse(sessionDataString || "null")
    // const token = sessionData?.access_token
    const { data, error } = await supabase.auth.getSession()
    if (error) {
        console.error("Error getting session:", error)
        return null
    }
    return data.session?.access_token
}
