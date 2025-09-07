import http from "../../shared/services/http-common.js";
export class AdministratorsService {
    resourceEndpoint = '/administrators-profiles';

    getAllAdministrators() {
        return http.get(this.resourceEndpoint);
    }
}