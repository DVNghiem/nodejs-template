import { Schema, model } from 'mongoose';

export interface IUserModel {
	username: string;
	age: number;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<IUserModel>(
	{
		username: { type: String, required: true },
		age: { type: Number, required: true },
		createdAt: { type: Date, required: true, default: Date.now() },
		updatedAt: { type: Date, required: true, default: Date.now() },
	},
	{
		strict: false,
	}
);

export default model('user', userSchema);
