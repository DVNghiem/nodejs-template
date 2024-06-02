import { Column, Entity } from 'typeorm';
import IEntity from './Entity';

@Entity()
export default class User extends IEntity {
	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	role: string;
}
