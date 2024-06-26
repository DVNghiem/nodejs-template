import ValidationError from '@core/domain/errors/ValidationError';
import Joi from 'joi';
export interface IUsername {
	value: string;
	required?: boolean;
}

export default class Username {
	public static validate(props: IUsername) {
		// allow null
		if (props.required == false && !props.value) return props.value;

		const schema = Joi.string().required().alphanum().min(6).max(60);
		const { error, value } = schema.validate(String(props.value)?.trim());
		if (error) throw new Error(error?.message.replace(/"/g, '')?.trim());

		return value;
	}
}
