<script>
export default {
  name: "register-form",
  props: ["onSubmit"],
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        birthdate: null,
        phone: "",
        email: "",
        password: "",
        dni: "",
        address: "",
        username: "",
      },
      dialogVisible: false, // Controla la visibilidad del diálogo
    };
  },
  methods: {
    submitForm() {
      this.onSubmit(this.formData);
      this.dialogVisible = true; // Muestra el diálogo cuando se crea la cuenta
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<template>
  <div class="register-container">
    <!-- Diálogo de éxito -->
    <pv-dialog v-model:visible="dialogVisible" header="Account Created Successfully">
      <p>Your account has been created successfully!</p>
      <pv-button label="Continue" class="dialog-button" @click="goToLogin" />
    </pv-dialog>

    <!-- Left Side -->
    <div class="left-side">
      <h2>Welcome Back!</h2>
      <p>To keep connected with us please login with your personal info</p>
      <pv-button label="SIGN IN" class="sign-in-button" @click="goToLogin" />
    </div>

    <!-- Right Side (Form) -->
    <div class="right-side">
      <h2>Create Account</h2>

      <!-- Registration Form -->
      <form @submit.prevent="submitForm" class="register-form">
        <div class="form-field">
          <pv-input-text v-model="formData.firstName" placeholder="Name" required />
          <pv-input-text v-model="formData.lastName" placeholder="Last Name" required />
        </div>

        <div class="form-field">
          <pv-calendar v-model="formData.birthdate" placeholder="Birthdate" />
          <pv-input-text v-model="formData.phone" placeholder="Cell phone" required />
        </div>

        <div class="form-field">
          <pv-input-text v-model="formData.email" placeholder="Email" required />
        </div>

        <div class="form-field">
          <pv-input-text v-model="formData.username" placeholder="Username" toggleMask required />
          <pv-password v-model="formData.password" placeholder="Password" toggleMask required />
        </div>

        <div class="form-field">
          <pv-input-text v-model="formData.dni" placeholder="DNI" required />
          <pv-input-text v-model="formData.address" placeholder="Address" required />
        </div>

        <pv-button type="submit" label="SIGN UP" class="sign-up-button" />
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Estilos del componente de registro */
.register-container {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.left-side, .right-side {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.left-side {
  background: linear-gradient(to bottom, #34a7c1, #fad961);
  color: white;
  height: 50%;
  width: 50%;
  border-radius: 15px 0 0 15px;
  text-align: center;
}

.right-side {
  width: 50%;
  height: 50%;
  background-color: white;
  border-radius: 0 15px 15px 0;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

p {
  margin-bottom: 1.5em;
}

.form-field {
  display: flex;
  gap: 10px;
  margin-bottom: 1em;
}

.sign-up-button, .submit-button {
  margin-top: 20px;
  background-color: #00bcd4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.sign-up-button:hover, .submit-button:hover {
  background-color: #0097a7;
}

.dialog-button {
  margin-top: 20px;
  background-color: #00bcd4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.dialog-button:hover {
  background-color: #0097a7;
}
</style>
