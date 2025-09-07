<template>
  <form @submit.prevent="submitForm">
    <pv-input-text v-model="formData.firstName" placeholder="First Name" required />
    <pv-input-text v-model="formData.lastName" placeholder="Last Name" required />
    <pv-input-text v-model="formData.email" placeholder="Email" required />
    <pv-input-text v-model="formData.dni" placeholder="DNI" required />
    <pv-input-text v-model="formData.address" placeholder="Address" required />
    <pv-input-text v-model="formData.phone" placeholder="Phone" required />
    <pv-input-text v-model="formData.username" placeholder="Username" required />
    <pv-password v-model="formData.password" placeholder="Password" required />

    <pv-button label="Save" type="submit" />
    <pv-button label="Cancel" @click="cancel" />
  </form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'add-teacher-form',
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        dni: '',
        phone: '',
        workingDays: '',
        field: '',
        administratorId: null, // Se llenará automáticamente con el ID del administrador logueado
        password: '' // Campo para la contraseña
      },
      days: ['Monday - Friday', 'Saturday - Sunday'],
      fields: ['Math', 'Science', 'Literature'] // Agrega los campos necesarios
    };
  },
  computed: {
    ...mapGetters("user", ["userId"]), // Obtiene el userId desde Vuex
  },
  watch: {
    userId: {
      immediate: true,
      handler(newValue) {
        this.formData.administratorId = newValue; // Asigna el ID automáticamente
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('save', this.formData); // Emite el formulario completo
    },
    cancel() {
      this.$emit('cancel'); // Emite el evento de cancelar
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
