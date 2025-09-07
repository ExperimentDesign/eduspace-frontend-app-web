<script>
import PvIftalabel from "../../main.js";
import PvInputText from "../../main.js";

export default {
  name: "create-reservation-dialog",
  components: {PvInputText, PvIftalabel}
}
</script>

<template>
  <pv-dialog v-bind:visible="visible" :modal="true" :style="{ width: '25rem' }">
    <template #header>
      <div class="flex justify-content-start">
        <p>Reserve Shared Space</p>
      </div>
    </template>
    <template #container>
      <pv-iftalabel>
        <pv-input-text id="title" v-model="title" />
        <label for="title">Title</label>
      </pv-iftalabel>
    </template>
  </pv-dialog>
</template>

<style scoped>

</style>