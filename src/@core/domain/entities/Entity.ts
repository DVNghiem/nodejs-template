import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export default abstract class BaseEntity {
	@PrimaryGeneratedColumn()
	id: number | undefined;

	@Column()
	createdAt: Date = new Date();

	@Column()
	updatedAt: Date = new Date();
}
