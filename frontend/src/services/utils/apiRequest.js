import { getApiConfig } from "@/services/configs/apiConfig"
import axios from "axios"

export const apiRequest = async (
    endpoint,
    method = "GET",
    data = null,
    headers = {},
) => {
    try {
        const apiConfig = await getApiConfig()
        const response = await axios({
            url: `${apiConfig.baseUrl}${endpoint}`,
            method,
            data,
            headers: { ...apiConfig.defaultHeaders, ...headers },
        })
        console.log("API Request Success:", response.data)
        return response.data
    } catch (error) {
        console.error("API Request Error:", error.response || error.message)
        throw error.response ? error.response.data : error
    }
}
