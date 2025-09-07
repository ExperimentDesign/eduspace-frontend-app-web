<script>
import RegisterForm from "../components/register-form.component.vue";
import { SignUpRequest } from "../../iam/model/sign-up.request.js";
import RegisterService from "../services/register.services.js";

export default {
  name: "register",
  components: {RegisterForm},
  methods: {
    async handleSubmit(formData) {
      try {
        // Crear la instancia de SignUpRequest con los datos del formulario
        const signUpRequest = new SignUpRequest(formData);

        // Llamar al servicio de registro con la solicitud
        const response = await RegisterService.registerAdministrator(signUpRequest);

        console.log("Administrator registered successfully:", response.message);
      } catch (error) {
        console.error("Error during registration:", error.message || error);
      }
    },
  },
};
</script>

<template>
  <div>
    <!-- Pasar el manejador de envío al formulario -->
    <RegisterForm @submit="handleSubmit"/>
  </div>
</template>

<style scoped>
</style>
