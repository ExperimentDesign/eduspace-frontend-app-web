<template>
  <div class="payroll-summary">
    <h1>Breakdown Reports</h1>

    <!-- Tabla principal con columnas adicionales -->
    <pv-data-table :value="summaryData" :responsiveLayout="'scroll'" class="summary-table" show-gridlines>
      <pv-column field="netPay" header="EMPLOYEES' NET PAY"></pv-column>
      <pv-column field="employeeCount" header="NO. OF EMPLOYEES"></pv-column>
      <pv-column field="totalDeduction" header="TOTAL DEDUCTION"></pv-column>
      <pv-column>
        <template #body="{ data }">
          <pv-button
              label="View Details & Pay"
              icon="pi pi-arrow-right"
              @click="viewDetailsAndPay"
              class="p-button-success"
          />
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</template>

<script>
import { PayrollService } from "../services/payroll.service.js";

export default {
  name: "PayrollSummaryComponent",
  data() {
    return {
      summaryData: [
        {
          netPay: 0, // Inicializamos con 0
          employeeCount: 0, // Inicializamos con 0
          totalDeduction: 0, // Inicializamos con 0
        },
      ],
    };
  },
  methods: {
    async loadPayrollData() {
      try {
        const payrollService = new PayrollService();
        const payrolls = await payrollService.getAll();

        // Calculamos la suma de los netPay, el número de empleados y el Total Deduction
        const netPay = payrolls.reduce((sum, payroll) => sum + payroll.salaryNet, 0);
        const employeeCount = payrolls.length;
        const totalDeduction = payrolls.reduce((sum, payroll) => sum + payroll.pensionContribution, 0);

        // Actualizamos los valores en el summaryData
        this.summaryData[0].netPay = `S/. ${netPay.toLocaleString("en-US")}`;
        this.summaryData[0].employeeCount = employeeCount;
        this.summaryData[0].totalDeduction = `S/. ${totalDeduction.toLocaleString("en-US")}`;
      } catch (error) {
        console.error("Error loading payroll data:", error);
      }
    },
    viewDetailsAndPay() {
      // Redirige al componente de gestión de nóminas
      this.$router.push({ name: "payroll-management" });
    },
  },
  mounted() {
    this.loadPayrollData(); // Cargar los datos de payroll al montar el componente
  },
};
</script>

<style scoped>
.payroll-summary {
  padding: 20px;
}

.summary-table {
  margin-bottom: 20px;
}
</style>
