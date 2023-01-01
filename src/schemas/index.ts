import _ from "lodash";

export class Schema {
    parse(data: any) {
        const result = {} as any;
        const errs = [];
        const props_name = Object.getOwnPropertyNames(this);
        for (const prop of props_name) {
            const checker = eval(`this.${prop}`) as Field;
            const err = checker.validate(prop, data[prop]);
            if (err.length > 0) {
                errs.push({ [prop]: err });
            } else {
                if (checker.default) result[prop] = checker.default;
                else result[prop] = data[prop];
            }
        }
        const extra_field = _.difference(Object.keys(data), props_name);
        if (extra_field.length > 0) {
            errs.push(
                ...extra_field.map((value) => {
                    return { [value]: value + " field: unexpected" };
                })
            );
        }
        return errs.length > 0 ? errs : result;
    }
}

class Field {
    require: boolean;
    default?: any;
    constructor(require: boolean, _default?: any) {
        this.require = require;
        this.default = _default;
    }
    validate(key: string, value: string): Array<string> {
        throw new Error("Inerface not implement");
    }
}

export class StringField extends Field {
    max_length?: number;
    constructor(require: boolean, max_length?: number, _default?: any) {
        super(require, _default);
        this.max_length = max_length;
    }
    validate(key: string, value: string): Array<string> {
        const errs = [] as any;
        if (this.default) {
            return errs;
        }
        if (this.require) {
            if (!value) {
                errs.push(`${key} is required`);
            }
        }
        if (this.max_length && value) {
            if (value.length > this.max_length) {
                errs.push("maximum length must < " + this.max_length);
            }
        }
        return errs;
    }
}
