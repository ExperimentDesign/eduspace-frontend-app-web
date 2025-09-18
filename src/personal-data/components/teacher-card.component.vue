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
    }
  }
}
</script>

<style scoped>
.teacher-card {
  margin: 10px;
}
</style>
