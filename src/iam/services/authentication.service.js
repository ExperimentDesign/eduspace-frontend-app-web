import http from "../../shared/services/http-common.js";

export class AuthenticationService {
    signIn(signInRequest) {
        return http.post("/authentication/sign-in", signInRequest)
            .then(response => {
                // Verifica que la respuesta tenga las propiedades esperadas
                if (!response.data || !response.data.token) {
                    throw new Error("Respuesta del servidor no válida");
                }
                return response; // Retorna la respuesta completa
            })
            .catch(error => {
                throw error;
            });
    }

    async signUp(signUpRequest) {
        const response = await http.post("/authentication/sign-up", signUpRequest);
        // Ensure the service returns the response data
        return response.data;
    }
}

export default new AuthenticationService();
