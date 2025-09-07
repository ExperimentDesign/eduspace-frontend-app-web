import AuthenticationService from "../../iam/services/authentication.service.js";

export default {
    namespaced: true,
    state: {
        id: null,
        role: null,
        token: localStorage.getItem("token") || null, // Cargar el token desde localStorage si existe
        isAuthenticated: false,
        user: null, // Objeto completo del usuario
    },
    mutations: {
        SET_USER(state, user) {
            console.log("Set user mutation called with:", user);
            state.id = user?.id || null;
            state.role = user?.role || null;
            state.user = user;
            console.log("State after SET_USER:", state);
        },
        SET_TOKEN(state, token) {
            console.log("Set token mutation called with:", token);
            state.token = token;
            console.log("State after SET_TOKEN:", state);
        },
        CLEAR_USER(state) {
            console.log("Clearing user data...");
            state.id = null;
            state.role = null;
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    actions: {
        async signIn({ commit }, payload) {
            console.log("Action signIn called with:", payload);
            try {
                const response = await AuthenticationService.signIn(payload);

                // Asegúrate de que los datos de respuesta están correctos
                const { id, role, token, username } = response.data;
                if (!id || !role || !token) {
                    throw new Error("Datos de usuario incompletos en la respuesta del servidor.");
                }


                // Actualiza el estado Vuex
                commit("SET_USER", { id, role, username });
                commit("SET_TOKEN", token);

                // Guarda el token en localStorage
                localStorage.setItem("token", token);
                console.log("User and token stored successfully");
            } catch (error) {
                console.error("Error during signIn:", error.message);
                throw error;
            }
        }
        ,
        async signUp(_, payload) {
            console.log("Action signUp called with:", payload);
            try {
                await AuthenticationService.signUp(payload);
            } catch (error) {
                console.error("Error during signUp:", error);
                throw error;
            }
        },
        signOut({ commit }) {
            console.log("Action signOut called");
            commit("CLEAR_USER");

            // Limpia el token de localStorage
            localStorage.removeItem("token");
        },
        clearAuth({ commit }) {
            commit("CLEAR_USER");
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        currentUser(state) {
            return state.user;
        },
        currentUsername(state) {
            return state.user?.username || "Guest";
        },
        userId(state) {
            console.log("Getter userId called, returning:", state.id);
            return state.id;
        },
        userRole(state) {
            console.log("Getter userRole called, returning:", state.role);
            return state.role;
        },
        userToken(state) {
            console.log("Getter userToken called, returning:", state.token);
            return state.token;
        },
    },
};
