import BaseEntity from '@core/domain/entities/Entity';
import NotFoundError from '@core/domain/errors/NotFoundError';
import IRepository, { FindOptions, PaginateOptions, PaginatedResult } from '@core/domain/repositories/IRepository';
import { injectable } from 'inversify';
import { DeepPartial, DeleteResult, EntityManager, FindOptionsWhere, In, Repository as BaseRepository, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

@injectable()
export default abstract class Repository<T extends BaseEntity, R extends BaseRepository<T>> implements IRepository<T> {
	protected readonly repository: R;

	constructor(repository: R) {
		this.repository = repository;
	}

	initQuery(alias?: string): SelectQueryBuilder<T> {
		return this.repository.createQueryBuilder(alias ?? this.repository.metadata.targetName);
	}

	async findById(id: EntityId, options?: Omit<FindOptions<T>, 'where'>): Promise<T | null> {
		return this.repository.findOne({
			where: { id } as FindOptionsWhere<T>,
			relations: options?.relations,
			order: options?.order,
			withDeleted: options?.withDeleted,
		});
	}

	async findByIdOrFail(id: EntityId, options?: Omit<FindOptions<T>, 'where'>): Promise<T> {
		const entity = await this.findById(id, options);
		if (!entity) {
			throw new NotFoundError(`${this.repository.metadata.targetName} with id ${id} not found`);
		}
		return entity;
	}

	async findByIds(ids: EntityId[], options?: Omit<FindOptions<T>, 'where'>): Promise<T[]> {
		if (ids.length === 0) {
			return [];
		}
		return this.repository.find({
			where: { id: In(ids) } as FindOptionsWhere<T>,
			relations: options?.relations,
			order: options?.order,
			withDeleted: options?.withDeleted,
		});
	}

	async findOne(options: FindOptions<T>): Promise<T | null> {
		return this.repository.findOne({
			where: options.where,
			relations: options.relations,
			order: options.order,
			withDeleted: options.withDeleted,
		});
	}

	async findOneOrFail(options: FindOptions<T>): Promise<T> {
		const entity = await this.findOne(options);
		if (!entity) {
			throw new NotFoundError(`${this.repository.metadata.targetName} not found`);
		}
		return entity;
	}

	async findAll(options?: FindOptions<T>): Promise<T[]> {
		return this.repository.find({
			where: options?.where,
			relations: options?.relations,
			order: options?.order,
			withDeleted: options?.withDeleted,
		});
	}

	async paginate(options?: PaginateOptions<T>): Promise<PaginatedResult<T>> {
		const page = Math.max(1, options?.page ?? 1);
		const limit = Math.max(1, options?.limit ?? 20);

		const [items, total] = await this.repository.findAndCount({
			where: options?.where,
			relations: options?.relations,
			order: options?.order,
			withDeleted: options?.withDeleted,
			skip: (page - 1) * limit,
			take: limit,
		});

		return {
			items,
			total,
			page,
			limit,
			pageCount: Math.ceil(total / limit),
		};
	}

	async count(options?: FindOptions<T>): Promise<number> {
		return this.repository.count({
			where: options?.where,
			relations: options?.relations,
			withDeleted: options?.withDeleted,
		});
	}

	async exists(options: FindOptions<T>): Promise<boolean> {
		return this.repository.exists({
			where: options.where,
			withDeleted: options.withDeleted,
		});
	}

	async store(data: Partial<T>): Promise<T> {
		const entity = this.repository.create(data as DeepPartial<T>);
		return this.repository.save(entity);
	}

	async storeMany(data: Partial<T>[]): Promise<T[]> {
		if (data.length === 0) {
			return [];
		}
		const entities = this.repository.create(data as DeepPartial<T>[]);
		return this.repository.save(entities);
	}

	async update(id: EntityId, data: Partial<T>): Promise<T | null> {
		await this.repository.update(id, data as Parameters<R['update']>[1]);
		return this.findById(id);
	}

	async updateMany(criteria: FindOptionsWhere<T>, data: Partial<T>): Promise<UpdateResult> {
		return this.repository.update(criteria, data as Parameters<R['update']>[1]);
	}

	async upsert(data: Partial<T> | Partial<T>[], conflictPaths: (keyof T)[]): Promise<T[]> {
		const items = Array.isArray(data) ? data : [data];
		if (items.length === 0) {
			return [];
		}
		await this.repository.upsert(items as Parameters<R['upsert']>[0], {
			conflictPaths: conflictPaths as string[],
		});
		const wheres = items.map(item => {
			const where: Record<string, unknown> = {};
			for (const path of conflictPaths) {
				where[path as string] = (item as Record<string, unknown>)[path as string];
			}
			return where as FindOptionsWhere<T>;
		});
		return this.repository.find({ where: wheres });
	}

	async delete(id: EntityId): Promise<DeleteResult> {
		return this.repository.delete(id);
	}

	async deleteMany(criteria: FindOptionsWhere<T>): Promise<DeleteResult> {
		return this.repository.delete(criteria);
	}

	async softDelete(id: EntityId): Promise<UpdateResult> {
		return this.repository.softDelete(id);
	}

	async restore(id: EntityId): Promise<UpdateResult> {
		return this.repository.restore(id);
	}

	runInTransaction<TResult>(work: (manager: EntityManager) => Promise<TResult>): Promise<TResult> {
		return this.repository.manager.transaction(work);
	}
}
