import axios from 'axios';
import http from "../../shared/services/http-common.js";

export class TeacherService {
    static async fetchTeachers() {
        const response = await http.get('/teachers-profiles');
        return response.data;
    }

    static async addTeacher(teacherData) {
        return http.post('/teachers-profiles', teacherData);
    }
}
