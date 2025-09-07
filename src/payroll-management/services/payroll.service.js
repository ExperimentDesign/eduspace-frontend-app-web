import http from "../../shared/services/http-common.js";
import { Payroll } from "../model/payroll.entity.js";

export class PayrollService {
    resourceEndpoint = "/payrolls";

    getAll() {
        return http.get(this.resourceEndpoint).then(response =>
            response.data.map(data => new Payroll(data))
        );
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`).then(response =>
            new Payroll(response.data)
        );
    }

    create(payrollResource) {
        return http.post(this.resourceEndpoint, payrollResource);
    }

    update(id, payrollResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, payrollResource);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    findByTeacherId(teacherId) {
        return http.get(`${this.resourceEndpoint}?teacherId=${teacherId}`).then(response =>
            response.data.map(data => new Payroll(data))
        );
    }
}
