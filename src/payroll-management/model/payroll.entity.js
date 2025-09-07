export class Payroll {
    constructor({
                    id = 0,
                    teacherId = 0,
                    salaryAmount = 0,
                    pensionContribution = 0,
                    salaryBonus = 0,
                    otherDeductions = 0,
                    serie = "A",  // Campo Serie Automática
                }) {
        this.id = id;
        this.teacherId = teacherId;
        this.salaryAmount = salaryAmount;
        this.pensionContribution = pensionContribution;
        this.salaryBonus = salaryBonus;
        this.otherDeductions = otherDeductions;
        this.serie = serie; // Guardamos la serie automática

        // Calculamos el salario neto al crear la instancia
        this.salaryNet = this.calculateNetSalary();
    }

    calculateNetSalary() {
        const totalDeductions = this.pensionContribution + this.otherDeductions;
        return this.salaryAmount + this.salaryBonus - totalDeductions;
    }
}
