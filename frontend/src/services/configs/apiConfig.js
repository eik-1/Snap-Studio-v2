const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiConfig = {
  baseUrl: BASE_URL,
  defaultHeaders: {
    "Content-Type": "application/json",
  },
};
