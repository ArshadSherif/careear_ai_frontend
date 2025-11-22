import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const sessionId = sessionStorage.getItem("session_id");
    if (sessionId) {
        config.params = { ...config.params, session_id: sessionId };
    }
    return config;
});

export default api;
