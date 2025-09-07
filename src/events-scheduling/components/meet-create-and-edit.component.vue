<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
import { TeachersService } from "../services/teachers.service.js";
import { mapGetters } from "vuex";
import {ClassroomsService} from "../services/classroom.service.js";
import {NotificationMService} from "../services/notificationM.service.js";
 // Importar el servicio de notificación

export default {
  name: "meet-create-and-edit-dialog",
  components: { CreateAndEdit },
  props: {
    item: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      submitted: false,
      teachers: [],
      classrooms: [],
      selectedTeachers: [],
      selectedClassroom: null
    };
  },
  computed: {
    // Obtener el nombre del administrador logueado desde Vuex
    ...mapGetters(["userName"])
  },
  created() {
    this.loadTeachers();
    this.loadClassrooms();
    this.formatTeachersForEdit();
  },
  methods: {
    loadTeachers() {
      const teacherService = new TeachersService();
      teacherService.getAllTeachers()
          .then(response => {
            this.teachers = response.data.map(teacher => ({
              id: teacher.id,
              name: `${teacher.firstName} ${teacher.lastName}`
            }));
            console.log("Teachers loaded:", this.teachers);
          })
          .catch(error => {
            console.error("Error loading teachers:", error);
          });
    },
    loadClassrooms() {
      const classroomsService = new ClassroomsService();
      classroomsService.getAllClassrooms()
          .then(response => {
            this.classrooms = response.data.map(classroom => ({
              id: classroom.id,
              name: classroom.name
            }));
            console.log("Classrooms loaded:", this.classrooms);
          })
          .catch(error => {
            console.error("Error loading classrooms:", error);
          });
    },
    formatTeachersForEdit() {
      // Convertir item.teachers a IDs si es necesario
      if (Array.isArray(this.item.teachers) && this.item.teachers.length > 0 && typeof this.item.teachers[0] === 'object') {
        this.item.teachers = this.item.teachers.map(teacher => teacher.id);
      }
    },
    formatDate(date) {
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    },
    formatTime(time) {
      if (!time || isNaN(Date.parse(time))) {
        return 'Invalid';
      }

      const d = new Date(time);
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    },
    onCancelRequested() {
      console.log("Cancel button clicked in child component");
      this.$emit('update:visible', false);
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      if (this.item.day && this.item.start && this.item.end) {
        this.item.day = this.formatDate(this.item.day);
        this.item.start = this.formatTime(this.item.start);
        this.item.end = this.formatTime(this.item.end);

        // Formatear los teachers seleccionados
        this.item.teachers = this.teachers
            .filter(teacher => this.item.teachers.includes(teacher.id))
            .map(teacher => ({
              id: teacher.id,
              name: teacher.name, // Utilizar el nombre completo si es necesario
              username: teacher.username
            }));

        this.$emit('save-requested', this.item);
      }
    }

  }
};
</script>

<template>
  <create-and-edit
      :entity="item"
      :visible="visible"
      entity-name="Meet"
      @update:visible="(value) => $emit('update:visible', value)"
      @cancelled="onCancelRequested"
      @saved="onSaveRequested"
  >
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="item.name" :class="{ 'p-invalid': submitted && !item.name }" />
          </pv-float-label>

          <pv-float-label>
            <label for="day">Day</label>
            <pv-date-picker
                v-model="item.day"
                showIcon
                fluid
                :showOnFocus="false"
                date-format="yy-mm-dd"
                :class="{ 'p-invalid': submitted && !item.day }"
                placeholder="Select a day"
            />
          </pv-float-label>

          <pv-float-label>
            <label for="hour">Hour</label>
            <pv-date-picker
                v-model="item.hour"
                showIcon
                fluid
                timeOnly
                iconDisplay="input"
                :class="{ 'p-invalid': submitted && !item.hour }"
                placeholder="Select a time"
            >
              <template #inputicon="slotProps">
                <i class="pi pi-clock" @click="slotProps.clickCallback" />
              </template>
            </pv-date-picker>
          </pv-float-label>

          <pv-float-label>
            <label for="invite">Invite</label>
            <pv-multi-select
                id="invite"
                v-model="item.teachers"
                :options="teachers"
                option-label="name"
                option-value="id"
                placeholder="Select teachers"
                :class="{ 'p-invalid': submitted && !item.teachers }"
            />
          </pv-float-label>

          <pv-float-label>
            <label for="location">Location</label>
            <pv-input-text id="location" v-model="item.location" :class="{ 'p-invalid': submitted && !item.location }" />
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>
/* Estilos específicos */
</style>
