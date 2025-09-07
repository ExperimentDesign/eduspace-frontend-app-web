import http from "../../shared/services/http-common.js";

export class NotificationService {
    resourceEndpoint = "/notifications";

    createNotification(notification) {
        return http.post(this.resourceEndpoint, notification);
    }
}
