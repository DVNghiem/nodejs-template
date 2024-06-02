import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult, QueryBuilder } from 'typeorm';
import BaseEntity from '../entities/Entity';

export default interface IRepository<T extends BaseEntity> {
	initQuery(): QueryBuilder<T>;

	index(): Promise<T[]>;

	findById(id: EntityId): Promise<T | null>;

	findByIds(id: [EntityId]): Promise<T[]>;

	store(data: any): Promise<T>;

	update(id: EntityId, data: any): Promise<T | null>;

	delete(id: EntityId): Promise<DeleteResult>;
}
