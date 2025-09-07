import http from "../../shared/services/http-common.js";
import {SignUpResponse} from "../../iam/model/sign-up.response.js";


class RegisterService {
    static async registerAdministrator(signUpRequest) {
        if (!signUpRequest.isValid()) {
            throw new Error("Invalid request data");
        }

        const response = await http.post("/administrator-profiles", signUpRequest);
        return new SignUpResponse(response.data);
    }
}

export default RegisterService;
