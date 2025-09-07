import axios from "axios";
import store from "../../store/index.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para añadir el token de autenticación
http.interceptors.request.use(
    (config) => {
        const token = store.getters["user/userToken"];
        console.log("Interceptor: Recuperando token de Vuex:", token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("Interceptor: Token añadido al header Authorization.");
        } else {
            console.warn("Interceptor: No se encontró un token.");
        }

        return config;
    },
    (error) => {
        console.error("Interceptor: Error en la solicitud:", error);
        return Promise.reject(error);
    }
);

export default http;
