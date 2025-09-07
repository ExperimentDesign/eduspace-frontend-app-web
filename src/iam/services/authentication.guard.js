import store from "../../store";

export function authenticationGuard(to, from, next) {
    const isAuthenticated = !!store.state.user.token;
    console.log("Verificando autenticación en el guard:", { isAuthenticated, to });
    if (isAuthenticated) {
        next();
    } else {
        console.warn("Usuario no autenticado, redirigiendo al login.");
        next({ name: "login" });
    }
}
