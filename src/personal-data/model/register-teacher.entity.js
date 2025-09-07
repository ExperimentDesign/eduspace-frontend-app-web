export class RegisterTeacher {
    constructor({ firstName, lastName, email, dni, address, phone, administratorId, username, password, role }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dni = dni;
        this.address = address;
        this.phone = phone;
        this.administratorId = administratorId;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
