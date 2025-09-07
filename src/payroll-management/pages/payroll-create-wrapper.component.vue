<template>
  <div>
    <payroll-create-and-edit
        :payroll="payroll"
        :availableTeachers="availableTeachers"
        :isCreateMode="true"
        @save="savePayroll"
        @cancel="cancel"
    />
  </div>
</template>

<script>

import http from "../../shared/services/http-common.js";
import PayrollCreateAndEdit from "../components/payroll-create-and-edit.component.vue";

import { mapGetters } from "vuex";
import { NotificationService } from "../services/notificationP.service.js"; // Importar servicio de notificaciones

export default {
  name: "PayrollCreateWrapper",
  components: { PayrollCreateAndEdit },
  data() {
    return {
      availableTeachers: [], // Asegúrate de que sea un array vacío al inicializar
      payroll: {
        teacherId: null,
        salaryAmount: 0,
        pensionContribution: 0,
        salaryBonus: 0,
        salaryNet: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["userId", "userRole"]), // Obtener userId y userRole desde Vuex
  },
  async created() {
    await this.loadTeachers(); // Cargar los profesores al montar el componente
  },
  methods: {
    async loadTeachers() {
      try {
        const response = await http.get("/teachers-profiles");
        this.availableTeachers = response.data || []; // Asigna un array vacío si la respuesta es indefinida
        console.log("Teachers loaded:", this.availableTeachers); // Para depurar y confirmar que se cargaron los datos
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    },
    calculateNetSalary(payroll) {
      const {salaryAmount, salaryBonus, pensionContribution} = payroll;
      return salaryAmount + salaryBonus - pensionContribution;
    },
    async savePayroll(payroll) {
      payroll.salaryNet = this.calculateNetSalary(payroll);

      try {
        // Realiza el POST a la ruta con el teacherId en la URL
        const response = await http.post(`/payrolls/teachers${payroll.teacherId}`, payroll);
        console.log("Payroll saved:", response.data);

        // Enviar notificación al profesor después de guardar la nómina
        await this.sendSalaryNotification(payroll);

        this.$router.push("/dashboard-admin/salary-calculation/management");
      } catch (error) {
        console.error("Error saving payroll:", error);
      }
    },
    cancel() {
      this.$router.push("/dashboard-admin/salary-calculation/management");
    },

    // Nueva función para enviar la notificación del salario
    async sendSalaryNotification(payroll) {
      const teacher = this.availableTeachers.find(t => t.id === payroll.teacherId);

      if (!teacher) {
        console.error("No se encontró el profesor.");
        return;
      }

      const notificationService = new NotificationService();
      const notification = {
        title: "Aviso de Salario",
        description: `Su pago de este mes es ${payroll.salaryNet}.`,
        type: 2, // Tipo 2 para salario
        adminId: this.userId, // Obtener el ID del admin desde Vuex
        teacherId: teacher.id,
        teacherName: `${teacher.firstName} ${teacher.lastName}`,
      };

      try {
        await notificationService.createNotification(notification);
        console.log("Notificación de salario enviada correctamente.");
      } catch (error) {
        console.error("Error al enviar notificación de salario:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos opcionales */
</style>
