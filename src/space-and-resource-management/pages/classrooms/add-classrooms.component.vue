<script>
import http from "../../../shared/services/http-common.js";
import ClassroomCreateAndEdit from "../../components/classrooms/classroom-create-and-edit.component.vue";

export default {
  name: "add-classroom",
  components: {ClassroomCreateAndEdit},
  data() {
    return {
      classroom: {
        name: '',
        description: '',
        teacherId: null
      }
    };
  },
  methods: {
    async saveClassroom(classroom) {
      try {
        // Verifica que el teacherId esté definido
        if (!classroom.teacherId) {
          throw new Error("Teacher ID is not selected.");
        }

        // Realiza la solicitud POST con la URL correcta
        const url = `/classrooms/teachers/${classroom.teacherId}`;
        await http.post(url, {
          name: classroom.name,
          description: classroom.description,
        });

        alert("Classroom created successfully");
        this.$router.push("/dashboard-admin/classrooms-shared-spaces");
      } catch (error) {
        console.error("Error creating classroom:", error);
        alert("Error creating classroom: " + error.message);
      }
    },
    cancel() {
      this.$router.push("/dashboard-admin/classrooms-shared-spaces");
    },
  }
}
</script>

<template>
  <classroom-create-and-edit 
      :classroom="classroom"
      :isCreateMode="true"
      @save="saveClassroom"
      @cancel="cancel"/>
</template>

<style scoped>

</style>