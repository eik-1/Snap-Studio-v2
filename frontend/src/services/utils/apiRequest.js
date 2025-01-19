import axios from "axios";
import { apiConfig } from "@src/services/configs/apiConfig";

export const apiRequest = async (endpoint, method = "GET", data = null, headers = {}) => {
  try {
    const response = await axios({
      url: `${apiConfig.baseUrl}${endpoint}`,
      method,
      data,
      headers: { ...apiConfig.defaultHeaders, ...headers },
    });
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error.response || error.message);
    throw error.response ? error.response.data : error;
  }
};
