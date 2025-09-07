<template>
  <div>
    <h2>Resumen de Pagos</h2>
    <div v-if="payrollSummary.length">
      <ul>
        <li v-for="payment in payrollSummary" :key="payment.id">
          <p><strong>Salario Base:</strong> {{ payment.salaryAmount }}</p>
          <p><strong>Contribuciones a Pensión:</strong> {{ payment.pensionContribution }}</p>
          <p><strong>Bonos:</strong> {{ payment.salaryBonus }}</p>
          <p><strong>Salario Neto:</strong> {{ payment.salaryNet }}</p>
        </li>
      </ul>
    </div>
    <p v-else>No hay datos de pagos disponibles.</p>
  </div>
</template>

<script>
import { PayrollService } from "../services/payroll.service.js";

export default {
  name: "PayrollSummaryTeacher",
  data() {
    return {
      payrollSummary: []
    };
  },
  computed: {
    // Accede directamente a los getters sin namespace
    userId() {
      return this.$store.getters.userId;
    }
  },
  async mounted() {
    const payrollService = new PayrollService();

    console.log("Teacher ID from Vuex:", this.userId); // Log para verificar el ID

    if (!this.userId) {
      console.warn("Teacher ID not found in Vuex store.");
      // Configuración manual temporal para debug
      this.$store.commit("setUser", { id: 2, role: "teacher", name: "Luis Gonzales" });
    }

    try {
      const teacherId = this.userId || 2; // Fallback al ID manual si no existe
      this.payrollSummary = await payrollService.findByTeacherId(teacherId);
      console.log("Payroll Summary:", this.payrollSummary);
    } catch (error) {
      console.error("Error fetching payroll summary:", error);
      this.payrollSummary = [];
    }
  }
};
</script>

<style scoped>
</style>
