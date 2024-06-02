import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

export default abstract class IEntity {
	@PrimaryGeneratedColumn()
	id: number | undefined;

	@Column()
	createdAt: Date = new Date();

	@Column()
	updatedAt: Date = new Date();
}
