<template>
  <div class="personal-data-page">
    <div class="teacher-list">
      <TeacherCardComponent
          v-for="teacher in teachers"
          :key="teacher.id"
          :teacher="teacher"
          @edit="editTeacher"
      />
    </div>
    <pv-button label="Add Teacher" @click="showAddForm = true" class="add-teacher-button"/>

    <AddTeacherFormComponent
        v-if="showAddForm"
        :administratorId="administratorId"
        @save="addTeacher"
        @cancel="showAddForm = false"
    />
  </div>
</template>

<script>
import TeacherCardComponent from "../../personal-data/components/teacher-card.component.vue";
import AddTeacherFormComponent from "../../personal-data/components/add-teacher-form.component.vue";
import {TeacherService} from "../../personal-data/services/teacher.service.js";

export default {
  name: 'persona-data',
  components: {
    TeacherCardComponent,
    AddTeacherFormComponent
  },
  data() {
    return {
      teachers: [],
      showAddForm: false,
      administratorId: this.$store.getters.userId // Asume que el ID del administrador se guarda en Vuex
    };
  },
  async created() {
    this.teachers = await TeacherService.fetchTeachers();
  },
  methods: {
    async addTeacher(newTeacher) {
      await TeacherService.addTeacher(newTeacher);
      this.teachers = await TeacherService.fetchTeachers();
      this.showAddForm = false;
    },
    editTeacher(teacher) {
      // Aquí puedes implementar la funcionalidad para editar el profesor
      console.log('Edit teacher:', teacher);
    }
  }
};
</script>

<style scoped>
.personal-data-page {
  padding: 20px;
}

.teacher-list {
  display: flex;
  flex-wrap: wrap;
}

.add-teacher-button {
  background-color: #34a7c1;
  color: white;
  margin-top: 20px;
}
</style>
