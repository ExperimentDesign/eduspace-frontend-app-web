<template>
  <div>
    <h2 class="title">Personnel Management</h2>
    <div class="search-container">
      <input
          type="text"
          v-model="searchQuery"
          @input="filterTeachers"
          placeholder="Search teachers by name..."
          class="search-input"
      />
    </div>

    <pv-data-table :value="filteredTeachers" v-if="filteredTeachers.length" class="teacher-table">
      <pv-column field="workingDays" header="Working Days" class="table-column"></pv-column>
      <pv-column field="field" header="Field" class="table-column"></pv-column>
      <pv-column field="firstName" header="First Name" class="table-column"></pv-column>
      <pv-column field="lastName" header="Last Name" class="table-column"></pv-column>

      <pv-column header="Actions" class="table-column">
        <template #body="slotProps">
          <div class="action-buttons">
            <pv-button label="View Replacements" @click="openReplacementDialog(slotProps.data)" class="replacement-button" />
          </div>
        </template>
      </pv-column>
    </pv-data-table>

    <p v-else class="no-teachers-message">No teachers found for this administrator.</p>

    <pv-dialog
        header="Possible Replacements"
        v-model:visible="isReplacementDialogVisible"
        :modal="true"
        :closable="true"
        class="replacement-dialog"
    >
      <ul v-if="possibleReplacements.length" class="replacement-list">
        <li v-for="replacement in possibleReplacements" :key="replacement.id" class="replacement-item">
          <span class="replacement-name">{{ replacement.firstName }} {{ replacement.lastName }} - {{ replacement.workingDays }}</span>
          <pv-button label="Swap Working Days" @click="swapWorkingDays(currentTeacher.id, replacement.id)" class="swap-button" />
        </li>
      </ul>
      <p v-else>No replacements found.</p>
    </pv-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { TeacherService } from "../services/teacher.service.js";
import { NotificationService } from "../services/notificationT.service.js"; // Asegúrate de importar este servicio

export default {
  data() {
    return {
      teachers: [],
      filteredTeachers: [],
      searchQuery: "",
      possibleReplacements: [],
      isReplacementDialogVisible: false,
      currentTeacher: null
    };
  },
  computed: {
    ...mapGetters(["userId", "userRole"])
  },
  methods: {
    async fetchTeachers() {
      const teacherService = new TeacherService();
      this.teachers = await teacherService.getByAdministratorId(this.userId);
      this.filteredTeachers = this.teachers;
    },

    async openReplacementDialog(teacher) {
      const teacherService = new TeacherService();
      this.currentTeacher = teacher;
      const replacements = await teacherService.findByField(teacher.field);
      this.possibleReplacements = replacements.filter(
          (replacement) => replacement.workingDays !== teacher.workingDays && replacement.id !== teacher.id
      );
      this.isReplacementDialogVisible = true;
    },

    async swapWorkingDays(teacherId1, teacherId2) {
      const teacherService = new TeacherService();

      // Realiza el intercambio de días de trabajo
      await teacherService.swapWorkingDays(teacherId1, teacherId2);

      // Obtén los profesores actualizados desde el backend
      const updatedTeachers = await teacherService.getUpdatedTeachers();

      // Actualiza la lista de profesores
      this.teachers = updatedTeachers;
      this.filteredTeachers = updatedTeachers; // Si es necesario, también actualiza el filtro

      // Cierra el diálogo
      this.isReplacementDialogVisible = false;

      // Envía las notificaciones después de hacer el cambio de días
      await this.sendNotificationForBothTeachers(teacherId1, teacherId2);

      await this.fetchTeachers();
    },

    async sendNotification(teacher) {
      const notificationService = new NotificationService();

      const notification = {
        title: "Cambio de días de trabajo",
        description: `Se ha intercambiado los días de trabajo con ${teacher.firstName} ${teacher.lastName}. Ahora trabajará ${teacher.workingDays}.`,
        type: 1,
        adminId: this.userId,
        teacherId: teacher.id,
        teacherName: `${teacher.firstName} ${teacher.lastName}`,
      };

      try {
        await notificationService.createNotification(notification);
      } catch (error) {
        console.error("Error al enviar notificación:", error);
      }
    },

    async sendNotificationForBothTeachers(teacherId1, teacherId2) {
      const teacher1 = this.teachers.find(t => t.id === teacherId1);
      const teacher2 = this.teachers.find(t => t.id === teacherId2);

      if (!teacher1 || !teacher2) {
        console.error("No se encontraron ambos profesores para enviar las notificaciones");
        return;
      }

      try {
        await this.sendNotification(teacher1);
        await this.sendNotification(teacher2);
        console.log("Notificaciones enviadas correctamente.");
      } catch (error) {
        console.error("Error al enviar notificaciones para ambos profesores:", error);
      }
    },

    filterTeachers() {
      this.filteredTeachers = this.teachers.filter((teacher) => {
        const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase());
      });
    }
  },

  mounted() {
    this.fetchTeachers();
  }
};
</script>

<style scoped>
.title {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

/* Styling for the search input */
.search-container {
  margin: 20px 0;
  text-align: center;
}

.search-input {
  padding: 8px;
  width: 250px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.teacher-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table-column {
  text-align: left;
  padding: 12px;
  font-weight: bold;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
}

.replacement-button {
  background-color: #008cba;
  color: white;
  padding: 8px 15px;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.replacement-button:hover {
  background-color: #00789e;
}

.no-teachers-message {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.replacement-dialog {
  width: 50%;
  margin: auto;
}

.replacement-list {
  list-style-type: none;
  padding-left: 0;
}

.replacement-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.swap-button {
  background-color: #28a745;
  color: white;
  padding: 8px 15px;
  border-radius: 6px;
}

.swap-button:hover {
  background-color: #218838;
}
</style>
