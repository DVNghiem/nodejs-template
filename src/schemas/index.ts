import _ from "lodash";
import { BadRequest } from "../libs/exception";

export class Schema {
    parse(data: any) {
        const result = {} as any;
        const errs = [];
        const props_name = Object.getOwnPropertyNames(this);
        for (const prop of props_name) {
            const checker = eval(`this.${prop}`) as Field;
            const err = checker.validate(prop, _.get(data, prop, null));
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
    validate(key: string, value: any): Array<string> {
        throw new Error("Interface not implement");
    }
}

export class StringField extends Field {
    max_length?: number;
    constructor(require: boolean, max_length?: number, _default?: any) {
        super(require, _default);
        this.max_length = max_length;
    }
    validate(key: string, value: any): Array<string> {
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

export class IntegerField extends Field {
    min?: number;
    max?: number;
    constructor(require: boolean, _default?: any, min?: number, max?: number) {
        super(require, _default);
        if (min && max)
            if (min > max) {
                throw new BadRequest("", ["min must smaller max"]);
            }
        this.min = min;
        this.max = max;
    }

    validate(key: string, value: any): Array<string> {
        const errs = [] as string[];
        const int_value = parseInt(value);
        if (this.default) {
            return errs;
        }
        if (isNaN(int_value)) {
            errs.push(`${key} must integer`);
            return errs;
        }

        if (this.require) {
            if (!int_value) {
                errs.push(`${key} is required`);
            }
        }
        if (this.min) {
            if (this.min > int_value) {
                errs.push(`${key} must > ${this.min}`);
            }
        }
        if (this.max) {
            if (this.max < int_value) {
                errs.push(`${key} must < ${this.max}`);
            }
        }
        return errs;
    }
}

export class EmailField extends Field {
    constructor(require: boolean, _default?: any) {
        super(require, _default);
    }

    validate(key: string, value: any): Array<string> {
        const errs = [] as string[];
        if (this.default) return errs;
        if (this.require) {
            if (!value) {
                errs.push(`${key} is required`);
            }
            else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
                errs.push("email invalid")
            }
        }
        return errs;
    }
}
