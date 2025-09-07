import http from "../../shared/services/http-common.js";
import store from "../../store/index.js";

http.interceptors.request.use(
    (config) => {
        const token = store.getters["user/userToken"];
        if (token) {
            console.log("Interceptor: Token encontrado:", token);
            config.headers["Authorization"] = `Bearer ${token}`;
        } else {
            console.warn("Interceptor: No se encontró un token.");
        }
        return config;
    },
    (error) => Promise.reject(error)
);
