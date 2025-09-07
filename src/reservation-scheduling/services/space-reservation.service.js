import http from "../../shared/services/http-common.js";

export class SpaceReservationService {
    reservationEndPoint = '/shared-area-reservation'

    getAll() {
        return http.get(this.reservationEndPoint);
    }

    create(reservation) {
        return http.post(this.reservationEndPoint, reservation);
    }

    delete(id) {
        return http.delete(`${this.reservationEndPoint}/${id}`);
    }

    findAllByAreaId(areaId) {
        return http.get(`${this.reservationEndPoint}?areaId=${areaId}`)
    }
}