import http from "../../shared/services/http-common.js";

export class AuthenticationService {
    signIn(signInRequest) {
        console.log("Enviando solicitud de inicio de sesión:", signInRequest);
        return http.post("/authentication/sign-in", signInRequest)
            .then(response => {
                console.log("Respuesta del servidor (signIn):", response.data);

                // Verifica que la respuesta tenga las propiedades esperadas
                if (!response.data || !response.data.token) {
                    throw new Error("Respuesta del servidor no válida");
                }
                return response; // Retorna la respuesta completa
            })
            .catch(error => {
                console.error("Error durante signIn:", error.message);
                throw error;
            });
    }


    async signUp(signUpRequest) {
        try {
            console.log("Enviando solicitud de registro:", signUpRequest);
            const response = await http.post("/authentication/sign-up", signUpRequest);
            console.log("Respuesta del servidor (signUp):", response.data);

            // Ensure the service returns the response data
            return response.data;
        } catch (error) {
            console.error("Error durante signUp:", error);
            throw error;
        }
    }
}

export default new AuthenticationService();
