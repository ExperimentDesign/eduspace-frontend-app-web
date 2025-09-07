import http from "../../shared/services/http-common.js";

export class TeacherService {
    resourceEndpoint = "/teachers-profiles";

    getAll() {
        return http.get(this.resourceEndpoint).then(response => response.data);
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`).then(response => response.data);
    }

    getByAdministratorId(adminId) {
        return http.get(`${this.resourceEndpoint}?administratorId=${adminId}`).then(response => response.data);
    }

    findByField(field) {
        return http.get(`${this.resourceEndpoint}?field=${field}`).then(response => response.data);
    }

    async getUpdatedTeachers() {
        return http.get(this.resourceEndpoint).then(response => response.data);
    }
    async swapWorkingDays(teacherId1, teacherId2) {
        // Obtener ambos profesores
        const teacher1 = await this.getById(teacherId1);
        const teacher2 = await this.getById(teacherId2);

        // Intercambiar los workingDays
        const updatedTeacher1 = { ...teacher1, workingDays: teacher2.workingDays };
        const updatedTeacher2 = { ...teacher2, workingDays: teacher1.workingDays };

        // Actualizar ambos profesores en el servidor
        await http.put(`${this.resourceEndpoint}/${teacherId1}`, updatedTeacher1);
        await http.put(`${this.resourceEndpoint}/${teacherId2}`, updatedTeacher2);
    }
}
