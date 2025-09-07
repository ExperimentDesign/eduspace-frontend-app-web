<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: "login",
  computed: {
    ...mapGetters('user', ['userId', 'userRole'])
  },
  methods: {
    ...mapActions('user', ['setUser', 'clearUser']),
    saveProfessionalUser() {
      this.setUser({ id: 1, role: 1})

      console.log('user id', this.userId)
      console.log('Professional, role:', this.userRole)


      this.$router.push({ name: 'home' })
    },
    saveTeacherUser() {
      this.setUser({ id:1, role: 2})
      console.log('Teacher, role:', this.userRole);
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<template>
  <div class="w-full">
    <h1>Welcome</h1>
  </div>
  <div class="login-container">
    <pv-card style="width: 25rem; overflow: hidden">
      <template #header>
        <p> Hello Admin </p>
      </template>
      <template #title>Admin</template>
      <template #content>
        <p class="m-0">
          Start now
        </p>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <pv-button label="Login" @click="saveProfessionalUser" class="w-full" />
        </div>
      </template>
    </pv-card>

    <pv-card style="width: 25rem; overflow: hidden">
      <template #header>
        <p> Hello Teacher </p>
      </template>
      <template #title>Teacher</template>
      <template #content>
        <p class="m-0">
          Start now
        </p>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <pv-button label="Login" @click="saveTeacherUser" class="w-full" />
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin: 2rem;
}

.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}
</style>
