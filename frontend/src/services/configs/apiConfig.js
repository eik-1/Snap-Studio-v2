import { signOut } from "../api/authService"
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
        await handleSessionInvalid()
        return null
    }
    console.log("Session Data:", data)

    // No active session
    if (data.session === null) {
        await handleSessionInvalid()
        return null
    }

    // Session exists but token may be expired
    if (!data.session.access_token) {
        try {
            const { data: refreshedData, error: refreshedError } =
                await supabase.auth.refreshSession()
            if (refreshedError) throw refreshedError

            console.log("Refreshed Session Data:", refreshedData)
            return refreshedData.session?.access_token || null
        } catch (refreshError) {
            console.error("Error refreshing session", refreshError)
            await handleSessionInvalid()
            return null
        }
    }
    console.log("Session Data:", data)
    return data.session?.access_token
}

async function handleSessionInvalid() {
    localStorage.removeItem("userData")
    await signOut()
    window.location.href = "/"
}
