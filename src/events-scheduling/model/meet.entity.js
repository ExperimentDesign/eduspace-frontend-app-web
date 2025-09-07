export class Meet {
    constructor({
                    id = 0,
                    title = '',
                    description = '',
                    day = '',
                    start = '',
                    end = '',
                    classroom = '',
                    teachers = [],
                    invite = [],
                    administrators = [],
                    accountable = [],
                    administrator = { name: "No person in charge" } // Agregar administrador principal
                }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.day = day;
        this.start = start;
        this.end = end;
        this.classroom = classroom;
        this.teachers = teachers.length ? teachers : invite;
        this.administrators = administrators.length ? administrators : accountable;
        this.administrator = administrator; // Incluir el campo `administrator`
    }
}
