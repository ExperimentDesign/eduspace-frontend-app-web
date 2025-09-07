<template>
  <div class="payroll-management">
    <h1>Payroll Management</h1>

    <pv-button
        label="Register New"
        icon="pi pi-plus"
        @click="createPayroll"
        class="create-button"
    ></pv-button>

    <pv-data-table :value="payrolls" :responsiveLayout="'scroll'" class="payroll-table" show-gridlines>
      <pv-column field="series" header="Nº" sortable=""></pv-column>
      <pv-column field="teacherName" header="Employee"></pv-column> <!-- Mostrar nombre del teacher -->
      <pv-column field="salaryAmount" header="Received"></pv-column>
      <pv-column field="pensionContribution" header="SS Company"></pv-column>
      <pv-column field="totalCost" header="Salary Cost"></pv-column>
    </pv-data-table>
  </div>
</template>

<script>
import http from "../../shared/services/http-common.js";

export default {
  data() {
    return {
      payrolls: [],
      teachers: [],
    };
  },
  methods: {
    async loadData() {
      await this.loadTeachers(); // Cargar teachers primero
      await this.loadPayrolls(); // Luego cargar payrolls
    },
    async loadPayrolls() {
      try {
        const response = await http.get("/payrolls");
        this.payrolls = response.data.map((payroll) => ({
          ...payroll,
          teacherName: this.getTeacherName(payroll.teacherId), // Asigna el nombre del teacher
          totalCost: payroll.salaryAmount + payroll.pensionContribution,
          series: `A/${payroll.teacherId}`,
          formattedDate: this.formatDate(payroll.datePayment),
          salaryNet: this.calculateNetSalary(payroll),
        }));
      } catch (error) {
        console.error("Error loading payrolls:", error);
      }
    },
    async loadTeachers() {
      try {
        const response = await http.get("/teachers-profiles");
        this.teachers = response.data;
      } catch (error) {
        console.error("Error loading teachers:", error);
      }
    },
    getTeacherName(id) {
      const teacher = this.teachers.find((teacher) => teacher.id === id);
      return teacher ? `${teacher.firstName} ${teacher.lastName}` : "Unknown Teacher";
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    calculateNetSalary(payroll) {
      const { salaryAmount, salaryBonus, pensionContribution, otherDeductions } = payroll;
      const totalDeductions = pensionContribution + otherDeductions;
      return salaryAmount + salaryBonus - totalDeductions;
    },
    createPayroll() {
      this.$router.push({ name: "create-payroll" });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.green {
  background-color: green;
}

.red {
  background-color: red;
}
</style>
