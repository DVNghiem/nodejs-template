export class BadRequest extends Error {
    errors: Array<any>;
    status: number;
    constructor(message: string, errors: Array<any>) {
        super(message);
        this.errors = errors;
        this.status = 400;
    }
}

export class Forbidden extends Error {
    errors: Array<any>;
    status: number;
    constructor(message: string, errors: Array<any>) {
        super(message);
        this.errors = errors;
        this.status = 403;
    }
}
