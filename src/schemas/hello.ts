import { IntegerField, Schema, StringField } from ".";

export class HelloSchema extends Schema {
    name: StringField;
    age: IntegerField
    constructor() {
        super()
        this.name = new StringField(false, 10)
        this.age = new IntegerField(true, undefined, 1, 100)
    }
}
