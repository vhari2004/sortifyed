import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API = axios.create({
    baseURL: API_BASE_URL,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");

    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status !== 401 ||
            originalRequest?._retry ||
            !localStorage.getItem("refresh")
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const refreshResponse = await axios.post(
                `${API_BASE_URL}/token/refresh/`,
                {
                    refresh: localStorage.getItem("refresh"),
                }
            );

            const newAccessToken = refreshResponse.data.access;
            localStorage.setItem("access", newAccessToken);
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return API(originalRequest);
        } catch (refreshError) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            return Promise.reject(refreshError);
        }
    }
);

export default API;
