<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";
import { TeacherService } from "../services/teachers.service.js";
import { mapGetters } from "vuex";
import { ClassroomsService } from "../services/classroom.service.js";

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
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      localItem: { ...this.item },
      submitted: false,
      teachers: [],
      classrooms: [],
      selectedTeachers: [],
    };
  },
  computed: {
    ...mapGetters('user', ['userId', 'currentUsername']),

    userName() {
      return this.currentUsername;
    }
  },
  created() {
    this.loadInitialData();
  },
  watch: {
    item: {
      handler(newItem) {
        this.localItem = { ...newItem };

        if (newItem.start && typeof newItem.start === 'string') {
          const [hours, minutes, seconds] = newItem.start.split(':');
          const startDate = new Date();
          startDate.setHours(hours, minutes, seconds || 0);
          this.localItem.start = startDate;
        }
        if (newItem.end && typeof newItem.end === 'string') {
          const [hours, minutes, seconds] = newItem.end.split(':');
          const endDate = new Date();
          endDate.setHours(hours, minutes, seconds || 0);
          this.localItem.end = endDate;
        }

        if (newItem.id) {
          this.localItem.administratorId = newItem.administrator?.id || null;
          // Para edición, si el item ya tiene un classroom, asignarlo al classroomId
          if (newItem.classroom) {
            this.localItem.classroomId = newItem.classroom.id;
          }
        } else {
          this.localItem.administratorId = this.userId;
          this.localItem.classroomId = null; // Limpiar para nueva creación
        }
        this.formatTeachersForEdit();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async loadInitialData() {
      try {
        await Promise.all([this.loadTeachers(), this.loadClassrooms()]);
        console.log("Initial data loaded");
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    },
    async loadTeachers() {
      const response = await TeacherService.fetchTeachers();
      this.teachers = response.map(teacher => ({
        id: teacher.id,
        name: `${teacher.firstName} ${teacher.lastName}`
      }));
      console.log("Teachers loaded:", this.teachers);
    },
    async loadClassrooms() {
      const classroomsService = new ClassroomsService();
      const response = await classroomsService.getAllClassrooms();
      this.classrooms = response.data.map(classroom => ({
        id: classroom.id,
        name: classroom.name
      }));
      console.log("Classrooms loaded:", this.classrooms);
    },
    formatTeachersForEdit() {
      if (Array.isArray(this.item.teachers) && this.item.teachers.length > 0) {
        this.selectedTeachers = this.item.teachers.map(teacher => typeof teacher === 'object' ? teacher.id : teacher);
      } else {
        this.selectedTeachers = [];
      }
    },
    formatDate(date) {
      if (!date) return null;
      const d = new Date(date);
      return d.toISOString().split('T')[0];
    },
    formatTime(time) {
      if (!time) return null;
      const d = new Date(time);
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
    onCancelRequested() {
      this.$emit('update:visible', false);
    },
    onSaveRequested() {
      this.submitted = true;
      if (!this.localItem.title || !this.localItem.day || !this.localItem.start || !this.localItem.end || !this.localItem.classroomId) {
        return;
      }

      const payload = {
        administratorId: this.localItem.administratorId,
        classroomId: this.localItem.classroomId,

        meetData: {
          title: this.localItem.title,
          description: this.localItem.description || '',
          date: this.formatDate(this.localItem.day),
          start: this.formatTime(this.localItem.start),
          end: this.formatTime(this.localItem.end),
        },
        teacherIds: this.selectedTeachers
      };

      if (this.edit) {
        payload.meetData.meetingId = this.localItem.id;
        payload.meetData.administratorId = this.localItem.administratorId;
        payload.meetData.classroomId = this.localItem.classroomId;
      }

      this.$emit('save-requested', payload);
    }
  }
};
</script>

<template>
  <create-and-edit
      :entity="localItem"
      :visible="visible"
      entity-name="Meet"
      @update:visible="(value) => $emit('update:visible', value)"
      @cancelled="onCancelRequested"
      @saved="onSaveRequested"
  >
    <template #content>
      <div class="p-fluid grid formgrid">
        <div class="field col-12">
          <pv-float-label>
            <label for="title">Title</label>
            <pv-input-text id="title" v-model="localItem.title" :class="{ 'p-invalid': submitted && !localItem.title }" />
          </pv-float-label>
        </div>

        <div class="field col-12">
          <pv-float-label>
            <label for="description">Description</label>
            <pv-input-text id="description" v-model="localItem.description" />
          </pv-float-label>
        </div>

        <div class="field col-12">
          <pv-float-label>
            <pv-dropdown
                id="classroom"
                v-model="localItem.classroomId"
                :options="classrooms"
                optionLabel="name"
                optionValue="id"
                placeholder="Select a classroom"
                :class="{ 'p-invalid': submitted && !localItem.classroomId }" />
          </pv-float-label>
        </div>

        <div class="field col-12">
          <pv-float-label>
            <pv-date-picker
                v-model="localItem.day"
                showIcon fluid :showOnFocus="false"
                date-format="yy-mm-dd"
                :class="{ 'p-invalid': submitted && !localItem.day }"
                placeholder="Select a day"
            />
          </pv-float-label>
        </div>

        <div class="field col-12 md:col-6">
          <pv-float-label>
            <pv-date-picker
                id="start-time"
                v-model="localItem.start"
                timeOnly
                :class="{ 'p-invalid': submitted && !localItem.start }"
                placeholder="Start time"
            />
          </pv-float-label>
        </div>
        <div class="field col-12 md:col-6">
          <pv-float-label>
            <pv-date-picker
                id="end-time"
                v-model="localItem.end"
                timeOnly
                :class="{ 'p-invalid': submitted && !localItem.end }"
                placeholder="End time"
            />
          </pv-float-label>
        </div>

        <div class="field col-12">
          <pv-float-label>
            <pv-multi-select
                id="invite"
                v-model="selectedTeachers"
                :options="teachers"
                option-label="name"
                option-value="id"
                placeholder="Select teachers"
            />
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>

.formgrid .field {
  margin-bottom: 1.5rem;
}

.p-float-label > label {
  top: 0.75rem;
  left: 0.75rem;
}

/* Ajusta la posición de la etiqueta cuando el campo está activo o lleno. */
.p-float-label > .p-inputtext:focus ~ label,
.p-float-label > .p-inputtext.p-filled ~ label,
.p-float-label > .p-dropdown.p-focus ~ label,
.p-float-label > .p-dropdown.p-inputwrapper-filled ~ label,
.p-float-label > .p-datepicker.p-focus ~ label,
.p-float-label > .p-datepicker.p-inputwrapper-filled ~ label,
.p-float-label > .p-multiselect.p-focus ~ label,
.p-float-label > .p-multiselect.p-inputwrapper-filled ~ label {
  top: -0.75rem;
  font-size: 0.75rem;
}
</style>