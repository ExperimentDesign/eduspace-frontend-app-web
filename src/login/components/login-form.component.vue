<script>
export default {
  name: "login-form",
  data() {
    return {
      email: "",
      password: "",
      role: "",
      roles: [
        { label: "Administrator", value: "Administrator" },
        { label: "Teacher", value: "Teacher" }
      ]
    };
  },
  methods: {
    submitLogin() {
      this.$emit("onLogin", { email: this.email, password: this.password});
    }
  }
};
</script>

<template>
  <div class="login-form-container">
    <h2>Sign in</h2>

    <form @submit.prevent="submitLogin">
      <pv-input-text v-model="email" placeholder="Email" required />
      <pv-password v-model="password" placeholder="Password" toggleMask required />

      <div class="role-selection">
      </div>

      <a href="#" class="forgot-password">Forgot your password?</a>

      <pv-button type="submit" label="SIGN IN" class="sign-in-button" />
    </form>
  </div>
</template>

<style scoped>
/* Estilos del formulario de inicio de sesión */
.login-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
}

.role-selection {
  margin-top: 1em;
  width: 100%;
}

.forgot-password {
  text-align: right;
  color: #9e9e9e;
  font-size: 0.9em;
  margin-bottom: 20px;
  cursor: pointer;
  text-decoration: none;
}

.sign-in-button {
  margin-top: 20px;
  background: linear-gradient(to right, #34a7c1, #4ad4d4);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1em;
  width: 150px;
}

.sign-in-button:hover {
  background: linear-gradient(to right, #2fa1b4, #41b8b8);
}
</style>
