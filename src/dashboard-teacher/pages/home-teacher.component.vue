<template>
  <div class="dashboard-container">
    <!-- Información del Teacher -->
    <div class="teacher-info-card">
      <div class="teacher-avatar">
        <pv-avatar
            :label="initials || 'N/A'"
            size="large"
            style="background-color: #42a5f5; color: #ffffff; font-size: 30px;"
        ></pv-avatar>
      </div>
      <div class="teacher-details">
        <h2>{{ fullName || "Teacher Information Not Available" }}</h2>
        <p><strong>Status:</strong> Teacher</p>
        <p><strong>Email:</strong> {{ teacher?.email || "Not available" }}</p>
        <p><strong>Phone:</strong> {{ teacher?.phone || "Not available" }}</p>
        <p><strong>DNI:</strong> {{ teacher?.dni || "Not available" }}</p>
      </div>
    </div>

    <!-- Cards en Bloques -->
    <div class="cards-section">
      <!-- Classroom Reservations -->
      <pv-card class="dashboard-card">
        <template #header>
          <h3>Classroom Reservations</h3>
        </template>
        <template #content>
          <ul>
            <li v-for="(reservation, index) in classroomReservations" :key="index">
              <p><strong>Classroom:</strong> {{ reservation.name || "Unknown" }}</p>
              <p>{{ reservation.description || "No description available" }}</p>
            </li>
            <p v-if="classroomReservations.length === 0">
              No classroom reservations available.
            </p>
          </ul>
        </template>
      </pv-card>

      <!-- Shared Area Reservations -->
      <pv-card class="dashboard-card">
        <template #header>
          <h3>Shared Area Reservations</h3>
        </template>
        <template #content>
          <ul>
            <li v-for="(reservation, index) in sharedAreaReservations" :key="index">
              <p><strong>Title:</strong> {{ reservation.title || "Unknown" }}</p>
              <p><strong>Start:</strong> {{ reservation.start || "N/A" }}</p>
              <p><strong>End:</strong> {{ reservation.end || "N/A" }}</p>
              <p>
                <strong>Area:</strong>
                {{
                  sharedAreas.find((area) => area.id === reservation.areaId)?.name || "Unknown"
                }}
              </p>
            </li>
            <p v-if="sharedAreaReservations.length === 0">
              No shared area reservations available.
            </p>
          </ul>
        </template>
      </pv-card>

      <!-- Meetings -->
      <pv-card class="dashboard-card">
        <template #header>
          <h3>Meetings</h3>
        </template>
        <template #content>
          <ul>
            <li v-for="(meeting, index) in meetings" :key="index">
              <p><strong>Classroom:</strong> {{ meeting.classroom || "Unknown" }}</p>
              <p><strong>Date:</strong> {{ meeting.day || "N/A" }}</p>
              <p><strong>Start:</strong> {{ meeting.start || "N/A" }}</p>
              <p><strong>End:</strong> {{ meeting.end || "N/A" }}</p>
              <p><strong>Title:</strong> {{ meeting.title || "No title" }}</p>
              <p><strong>Description:</strong> {{ meeting.description || "No description" }}</p>
            </li>
            <p v-if="meetings.length === 0">No meetings scheduled.</p>
          </ul>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import http from "../../shared/services/http-common.js";

export default {
  name: "TeacherDashboard",
  data() {
    return {
      teacher: null, // Información del Teacher
      classroomReservations: [], // Reservas de aulas
      sharedAreaReservations: [], // Reservas de áreas comunes
      sharedAreas: [], // Lista de áreas compartidas
      meetings: [], // Reuniones del Teacher
    };
  },
  computed: {
    ...mapGetters(["userId"]),
    fullName() {
      return `${this.teacher?.firstName || ""} ${this.teacher?.lastName || ""}`.trim();
    },
    initials() {
      const [firstName, lastName] = [
        this.teacher?.firstName || "",
        this.teacher?.lastName || "",
      ];
      return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
    },
  },
  async mounted() {
    try {
      console.log("Teacher ID desde Vuex:", this.userId);

      // Realizar peticiones para cargar los datos
      const teacherResponse = await http.get("/teachers-profiles");
      const allTeachers = teacherResponse.data;
      this.teacher = allTeachers.find((t) => String(t.id) === String(this.userId)) || {
        email: null,
        phone: null,
        dni: null,
      };

      const classroomResponse = await http.get("/classrooms");
      this.classroomReservations = classroomResponse.data.filter(
          (classroom) => classroom.teacherId === this.userId
      );

      const sharedAreaReservationResponse = await http.get("/shared-area-reservation");
      this.sharedAreaReservations = sharedAreaReservationResponse.data.filter(
          (reservation) => reservation.teacherId === this.userId
      );

      const sharedAreaResponse = await http.get("/shared-area");
      this.sharedAreas = sharedAreaResponse.data;

      const meetResponse = await http.get("/meet");
      this.meetings = meetResponse.data.filter((meet) =>
          meet.teachers.some((teacher) => teacher.id === this.userId)
      );
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  },
};
</script>

<style scoped>
/* Contenedor Principal */
.dashboard-container {
  padding: 20px;
}

/* Card Principal del Teacher */
.teacher-info-card {
  display: flex;
  background-color: #e3f2fd;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 20px;
}

.teacher-avatar {
  margin-right: 20px;
}

.teacher-details h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.teacher-details p {
  margin: 5px 0;
}

/* Cards de Contenido */
.cards-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.dashboard-card {
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.dashboard-card h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}
</style>
