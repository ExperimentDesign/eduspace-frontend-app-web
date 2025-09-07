<template>
  <pv-card class="teacher-card">
    <template #header>

    </template>
    <template #title>{{ fullName }}</template>
    <template #content>
      <p>Email: {{ maskedEmail }}</p>
      <p>DNI: {{ teacher.dni }}</p>
      <p>Phone: {{ teacher.phone }}</p>
    </template>
    <template #footer>
      <pv-button label="Edit" @click="editTeacher" class="edit-button"/>
    </template>
  </pv-card>
</template>

<script>
export default {
  name: 'teacher-card',
  props: {
    teacher: Object
  },
  computed: {
    fullName() {
      return `${this.teacher.firstName} ${this.teacher.lastName}`;
    },
    maskedEmail() {
      return this.teacher.email.replace(/(.{3})(.*)(?=@)/, "$1****");
    },
    image() {
      return '/path/to/default-image.jpg'; // Cambia esta ruta según la imagen por defecto
    }
  },
  methods: {
    editTeacher() {
      this.$emit('edit', this.teacher);
    }
  }
}
</script>

<style scoped>
.teacher-card {
  margin: 10px;
}
.teacher-photo {
  width: 100%;
  height: auto;
  border-radius: 50%;
}
.edit-button {
  background-color: #FFA500;
  color: white;
}
</style>
