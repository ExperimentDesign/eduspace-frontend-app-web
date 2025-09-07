import http from "./http-common.js";

export class SharedAreaService {
    resourceEndPoint = '/shared-area'

    getAll() {
        return http.get(this.resourceEndPoint)
    }
}