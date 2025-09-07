import http from "../../shared/services/http-common.js";

export class NotificationService {
    resourceEndpoint = '/notifications';

    // Obtener todas las notificaciones
    getAllNotifications() {
        return http.get(this.resourceEndpoint);
    }

    // Obtener una notificación por su ID
    getNotificationById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    // Crear una nueva notificación
    createNotification(notificationResource) {
        return http.post(this.resourceEndpoint, notificationResource);
    }

    // Actualizar una notificación existente
    updateNotification(id, notificationResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, notificationResource);
    }

    // Eliminar una notificación
    deleteNotification(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    // Buscar notificaciones por el ID de profesor (teacherId)
    findNotificationsByTeacher(teacherId) {
        return http.get(`${this.resourceEndpoint}?teacherId=${teacherId}`);
    }

    // Buscar notificaciones por el tipo (type)
    findNotificationsByType(type) {
        return http.get(`${this.resourceEndpoint}?type=${type}`);
    }

    // Buscar notificaciones por el título (title)
    findNotificationsByTitle(title) {
        return http.get(`${this.resourceEndpoint}?title=${title}`);
    }

    // Buscar notificaciones por la fecha (fecha específica)
    findNotificationsByDate(date) {
        return http.get(`${this.resourceEndpoint}?date=${date}`);
    }
}
