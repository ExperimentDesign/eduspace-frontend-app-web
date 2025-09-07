import http from "../../shared/services/http-common.js";

export class ClassroomService {
    endpoint = '/classrooms';

    getAll() {
        return http.get(this.endpoint);
    }

    create(classroom) {
        return http.post(this.endpoint, classroom);
    }

    // Nuevo método para crear un aula con un maestro encargado
    createWithTeacher(classroom, teacherId) {
        return http.post(`${this.endpoint}/teachers/${teacherId}`, classroom);
    }

    delete(id) {
        return http.delete(`${this.endpoint}/${id}`);
    }
}
