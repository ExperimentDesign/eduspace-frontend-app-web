import http from "../../shared/services/http-common.js";

export class SharedAreaService {
    spaceAreaEndPoint = '/shared-area'

    getAll() {
        return http.get(this.spaceAreaEndPoint);
    }

    create(space) {
        return http.post(this.spaceAreaEndPoint, space);
    }

    delete(id) {
        return http.delete(`${this.spaceAreaEndPoint}/${id}`);
    }

    findAllByAreaId(areaId) {
        return http.get(`${this.spaceAreaEndPoint}?areaId=${areaId}`)
    }
}