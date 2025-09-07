import http from "../../shared/services/http-common.js";

export class TeachersService {
    resourceEndpoint = '/teachers-profiles';

    getAllTeachers() {
        return http.get(this.resourceEndpoint);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    createTeachers(teacherResource) {
        return http.post(this.resourceEndpoint, teacherResource);
    }

    updateTeachers(id, teacherResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, teacherResource);
    }

    deleteTeachers(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByNameTeachers(name) {
        return http.get(`${this.resourceEndpoint}?name=${name}`);
    }

    findByUsername(username) {
        return http.get(`${this.resourceEndpoint}?username=${username}`);
    }
}