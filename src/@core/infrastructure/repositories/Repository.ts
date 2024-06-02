import BaseEntity from '@core/domain/entities/Entity';
import IRepository from '@core/domain/repositories/IRepository';
import { QueryBuilder, DeleteResult, Repository as BaseRepository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

export default abstract class Repository<T extends BaseEntity, R extends BaseRepository<T>> implements IRepository<T> {
	public abstract softDelete(id: EntityId): Promise<DeleteResult>;

	protected readonly repository: R;
	constructor(repository: R) {
		this.repository = repository;
	}

	initQuery(): QueryBuilder<T> {
		return this.repository.createQueryBuilder();
	}
	index(): Promise<T[]> {
		throw new Error('Method not implemented.');
	}
	async findById(id: EntityId): Promise<T | null> {
		const query = this.initQuery();
		return await query.select().where('id = :id', { id }).getOne();
	}
	findByIds(id: [EntityId]): Promise<T[]> {
		const query = this.initQuery();
		return query.select().where('id IN (:...id)', { id }).getMany();
	}
	async store(data: T): Promise<T> {
		return this.repository.save(data);
	}
	async delete(id: EntityId): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

	async update(id: EntityId, data: any): Promise<T | null> {
		await this.repository.update(id, data);
		return this.findById(id);
	}
}
