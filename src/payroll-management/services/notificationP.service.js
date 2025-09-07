import http from "../../shared/services/http-common.js";

export class NotificationService {
    resourceEndpoint = "/notifications";

    async createNotification(notification) {
        try {
            const response = await http.post(this.resourceEndpoint, notification);
            return response.data;
        } catch (error) {
            console.error("Error al crear la notificación:", error);
            throw error;
        }
    }
}
