// notifications.entity.js
export class Notification {
    constructor({ id, title, description, type, adminId, teacherId, teacherName }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.adminId = adminId;
        this.teacherId = teacherId;
        this.teacherName = teacherName;
    }
}
