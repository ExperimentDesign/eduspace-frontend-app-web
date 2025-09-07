import http from "../../shared/services/http-common.js";

export class MeetService {
    resourceEndpoint = '/meetings';

    getAll() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(meetResource) {
        return http.post(this.resourceEndpoint, meetResource);
    }

    update(id, meetResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, meetResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }

    findByDay(day) {
        return http.get(`${this.resourceEndpoint}?day=${day}`);
    }

    findByHour(hour) {
        return http.get(`${this.resourceEndpoint}?hour=${hour}`);
    }

    findByLocation(location) {
        return http.get(`${this.resourceEndpoint}?location=${location}`);
    }

    findByTeacher(teacherName) {
        return http.get(`${this.resourceEndpoint}?teachers.name=${teacherName}`);
    }

    findByInvitee(teacherName) {
        return http.get(`${this.resourceEndpoint}?invite.name=${teacherName}`);
    }
}