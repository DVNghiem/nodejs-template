import { Schema, StringField } from ".";

export class HelloSchema extends Schema {
    name: StringField;
    constructor() {
        super()
        this.name = new StringField(false, 10)
    }
}
