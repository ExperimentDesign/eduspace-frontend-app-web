// TeacherService.js
import http from "../../shared/services/http-common.js";

export class TeacherService {
    async getAll() {
        try {
            const response = await http.get("/teachers-profiles");
            // Asegúrate de que los datos tengan el formato esperado
            return response.data.map(teacher => ({
                id: teacher.id,
                name: `${teacher.firstName} ${teacher.lastName}`, // Concatenación si el nombre completo se generó de esta forma
                // Agregar otros campos si es necesario
            }));
        } catch (error) {
            console.error("Error fetching teachers:", error);
            return [];
        }
    }
}
