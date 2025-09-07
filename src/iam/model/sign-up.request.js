export class SignUpRequest {
    constructor({ firstName, lastName, email, dni, address, phone, username, password }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dni = dni;
        this.address = address;
        this.phone = phone;
        this.username = username;
        this.password = password;
    }

    /**
     * Validates the request data
     * @returns {boolean} - True if all required fields are present
     */
    isValid() {
        return !!(this.firstName && this.lastName && this.email && this.username && this.password);
    }
}
