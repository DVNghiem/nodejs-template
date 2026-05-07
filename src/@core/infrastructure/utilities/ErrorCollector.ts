import { injectable } from 'inversify';

export interface IErrorCollection {
	[key: string]: string;
}

@injectable()
export default class ErrorCollector {
	private _errors: IErrorCollection;

	public constructor() {
		this._errors = {};
	}

	public get errors() {
		return this._errors;
	}

	public collect<T>(tag: string, method: () => T): T | undefined {
		try {
			return method();
		} catch (error: any) {
			this._errors[tag] = error.message;
		}
	}

	public async collectAsync<T>(tag: string, method: () => Promise<T>): Promise<T | undefined> {
		try {
			return await method();
		} catch (error: any) {
			this._errors[tag] = error.message;
		}
	}

	public clear() {
		this._errors = {};
	}

	public hasError() {
		return Object.keys(this._errors).length > 0;
	}
}
