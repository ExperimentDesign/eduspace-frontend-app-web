<script>
import http from "../../../shared/services/http-common.js";
import ClassroomCard from "../../components/classrooms/classroom-card.component.vue";
import {TeacherService} from "../../../personal-data/services/teacher.service.js";

export default {
  name: "classroom",
  components: {ClassroomCard},
  data() {
    return {
      classrooms: []
    };
  },
  async mounted() {
    await this.loadClassroom();
  },
  methods: {
    async loadClassroom() {
      try {
        const response = await http.get("/classrooms");
        const teachers = await TeacherService.fetchTeachers();

        console.log("Classrooms data:", response.data);
        console.log("Teachers data:", teachers);

        this.classrooms = response.data.map(classroom => {
          const teacher = teachers.find(t => t.id === classroom.teacherId);
          console.log(`Mapping classroom: ${classroom.name}, teacher found:`, teacher);
          return {
            ...classroom,
            teacherName: teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unassigned',
          };
        });
      } catch (error) {
        console.error("Error loading classrooms:", error);
      }
    },
    async deleteClassroom(id) {
      try {
        await http.delete(`/classrooms/${id}`);
        this.classrooms = this.classrooms.filter(classroom => classroom.id !== id);
      } catch (error) {
        console.error("Error deleting classroom:", error);
      }
    },
    editClassroom(id) {
      this.$router.push({name: "edit classroom", params: {id}});
    },
    goToAdd() {
      this.$router.push({name: 'add-classrooms'});
    }
  }
}
</script>

<template>
  <div style="display: flex; align-items: center">
    <h4 style="margin-right: 20px">Classrooms and Shared Spaces</h4>
    <i class="pi pi-chevron-right"></i>
    <h4 style="margin-left: 20px">Classrooms</h4>
  </div>

  <div class="container">
    <!-- Card para Agregar nuevo environment -->
    <div class="card border-round-xl shadow-2 p-3 h-full">
      <div class="text-xl font-semibold mb-2">Title</div>
      <div class="mb-2">
        <span class="font-medium text-600">Description:</span>
      </div>
      <div class="flex align-items-center gap-2 mb-3">
        <i class="pi pi-box text-yellow-500"></i>
        <span>Environment</span>
      </div>
      <pv-button label="Add" severity="warning" text raised class="w-full" @click="goToAdd"/>
    </div>

    <div class="cards-container">
      <classroom-card
          v-for="classroom in classrooms"
          :key="classroom.id"
          :classroom="classroom"
          @delete="deleteClassroom"
          @edit="editClassroom"/>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 100%;
  align-content: space-between;
  gap: 20px;
}

.cards-container {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.card {
  width: 300px;
}
</style>