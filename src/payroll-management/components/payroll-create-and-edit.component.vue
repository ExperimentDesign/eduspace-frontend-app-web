<template>
  <div class="payroll-create-form">
    <div class="form-header">
      <h2>Payment Register</h2>
      <h2>Payroll</h2>
    </div>
    <form @submit.prevent="save" class="form-grid">
      <div class="left-column">
        <div class="form-field">
          <label>Automatic Serie:</label>
          <pv-input-text v-model="form.serie" value="A" disabled/>
        </div>

        <div class="form-field">
          <label>Employee:</label>
          <pv-select
              v-if="availableTeachers && availableTeachers.length > 0"
              v-model="form.teacherId"
              :options="availableTeachers"
              option-label="name"
              option-value="id"
              placeholder="Select a teacher"
          />
          <p v-else>No teachers available</p>
        </div>
      </div>

      <div class="right-column">
        <div class="form-field">
          <label>Received:</label>
          <pv-input-number v-model.number="form.salaryAmount" :min="0"/>
        </div>

        <div class="form-field">
          <label>Contribution to the worker:</label>
          <pv-input-number v-model.number="form.salaryBonus" :min="0"/>
        </div>

        <div class="form-field">
          <label>Advances:</label>
          <pv-input-number v-model.number="form.pensionContribution" :min="0"/>
        </div>

        <div class="form-field">
          <label>Total Pay:</label>
          <pv-input-number :value="netSalary" disabled/>
        </div>
      </div>

      <div class="form-actions">
        <pv-button type="submit" label="Save" class="p-button-success"/>
        <pv-button
            type="button"
            label="Cancel"
            class="p-button-secondary"
            @click="cancel"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { TeacherService } from "../services/teacher.service.js";

export default {
  name: "PayrollCreateAndEdit",
  props: {
    payroll: {
      type: Object,
      required: true,
      default: () => ({
        serie: "A",
        teacherId: null,
        salaryAmount: 0,
        pensionContribution: 0,
        salaryBonus: 0,
        salaryNet: 0,
      }),
    },
  },
  data() {
    return {
      form: { ...this.payroll },
      availableTeachers: [], // Lista inicializada para los profesores
    };
  },
  computed: {
    netSalary() {
      return (this.form.salaryAmount || 0) + (this.form.salaryBonus || 0) - (this.form.pensionContribution || 0);
    },
  },
  watch: {
    form: {
      handler() {
        this.form.salaryNet = this.netSalary;
      },
      deep: true,
    },
  },
  mounted() {
    this.loadTeachers();
  },
  methods: {
    async loadTeachers() {
      try {
        const teacherService = new TeacherService();
        this.availableTeachers = await teacherService.getAll();
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    },
    save() {
      if (!this.form.teacherId) {
        alert("Please select a teacher.");
        return;
      }
      this.$emit("save", this.form);
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.payroll-create-form {
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 8px;
  max-width: 900px;
  margin: auto;
  border: solid rgb(226, 232, 240) 1px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  color: #000000;
  font-weight: bold;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-actions {
  grid-column: span 2;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
