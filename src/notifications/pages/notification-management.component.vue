<template>
  <div class="notifications-page">
    <!-- Título de la página -->
    <h1 class="page-title">Notifications</h1>

    <!-- Lista de notificaciones en fila horizontal -->
    <div class="notifications-container">
      <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="getNotificationClass(notification.type)"
          class="notification-card"
      >
        <h3>{{ notification.title }}</h3>
        <p>{{ notification.description }}</p>
        <span class="teacher-name">Teacher: {{ notification.teacherName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { NotificationService } from '../services/notificationF.service.js';
import { mapGetters } from 'vuex';

export default {
  name: "NotificationsPage",
  data() {
    return {
      notificationService: new NotificationService(),
      notifications: []  // Lista para almacenar las notificaciones
    };
  },
  computed: {
    ...mapGetters(["userId"]),  // Accede al userId desde Vuex
  },
  watch: {
    userId(newUserId) {
      if (newUserId) {
        this.fetchNotifications(newUserId); // Refresca las notificaciones cuando cambia el userId
      }
    }
  },
  methods: {
    // Método para obtener las notificaciones filtradas por el userId
    fetchNotifications(userId) {
      this.notificationService.findNotificationsByTeacher(userId).then(response => {
        // Asegúrate de que la respuesta contiene un array de notificaciones
        this.notifications = response.data;
      }).catch(error => {
        console.error('Error al obtener las notificaciones:', error);
      });
    },

    // Método para obtener la clase CSS basada en el tipo de notificación
    getNotificationClass(type) {
      switch (type) {
        case 1:
          return 'notification-type-1';
        case 2:
          return 'notification-type-2';
        case 3:
          return 'notification-type-3';
        default:
          return '';
      }
    }
  },
  created() {
    if (this.userId) {
      this.fetchNotifications(this.userId);  // Inicializa las notificaciones al cargar el componente
    }
  }
};
</script>

<style scoped>
.notifications-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Contenedor de notificaciones para alinearlas en horizontal */
.notifications-container {
  display: flex;
  flex-wrap: wrap; /* Permite que las tarjetas se ajusten si el espacio es pequeño */
  justify-content: center; /* Centra las tarjetas horizontalmente */
}

.notification-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  width: 250px; /* Ajusta el ancho de las tarjetas */
  margin: 10px; /* Espacio entre las tarjetas */
  box-sizing: border-box; /* Asegura que el padding no afecte el tamaño */
}

.notification-type-1 {
  background-color: lightblue;
}

.notification-type-2 {
  background-color: lightgreen;
}

.notification-type-3 {
  background-color: lightcoral;
}

.teacher-name {
  font-weight: bold;
  margin-top: 10px;
}
</style>
