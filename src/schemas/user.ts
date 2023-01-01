import { IntegerField, Schema, StringField } from ".";

export class UserSChema extends Schema {
    username: StringField;
    password: StringField;
    email: StringField;
    constructor() {
        super()
        this.username = new StringField(true, 10)
        this.password = new StringField(true, 10)
        this.email = new StringField(true)
    }
}
