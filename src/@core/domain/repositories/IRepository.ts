import { DeleteResult, EntityManager, FindOptionsOrder, FindOptionsRelations, FindOptionsWhere, SelectQueryBuilder, UpdateResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import BaseEntity from '../entities/Entity';

export interface FindOptions<T> {
	where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
	relations?: FindOptionsRelations<T>;
	order?: FindOptionsOrder<T>;
	withDeleted?: boolean;
}

export interface PaginateOptions<T> extends FindOptions<T> {
	page?: number;
	limit?: number;
}

export interface PaginatedResult<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	pageCount: number;
}

export default interface IRepository<T extends BaseEntity> {
	initQuery(alias?: string): SelectQueryBuilder<T>;

	findById(id: EntityId, options?: Omit<FindOptions<T>, 'where'>): Promise<T | null>;
	findByIdOrFail(id: EntityId, options?: Omit<FindOptions<T>, 'where'>): Promise<T>;
	findByIds(ids: EntityId[], options?: Omit<FindOptions<T>, 'where'>): Promise<T[]>;
	findOne(options: FindOptions<T>): Promise<T | null>;
	findOneOrFail(options: FindOptions<T>): Promise<T>;
	findAll(options?: FindOptions<T>): Promise<T[]>;
	paginate(options?: PaginateOptions<T>): Promise<PaginatedResult<T>>;
	count(options?: FindOptions<T>): Promise<number>;
	exists(options: FindOptions<T>): Promise<boolean>;

	store(data: Partial<T>): Promise<T>;
	storeMany(data: Partial<T>[]): Promise<T[]>;
	update(id: EntityId, data: Partial<T>): Promise<T | null>;
	updateMany(criteria: FindOptionsWhere<T>, data: Partial<T>): Promise<UpdateResult>;
	upsert(data: Partial<T> | Partial<T>[], conflictPaths: (keyof T)[]): Promise<T[]>;

	delete(id: EntityId): Promise<DeleteResult>;
	deleteMany(criteria: FindOptionsWhere<T>): Promise<DeleteResult>;
	softDelete(id: EntityId): Promise<UpdateResult>;
	restore(id: EntityId): Promise<UpdateResult>;

	runInTransaction<R>(work: (manager: EntityManager) => Promise<R>): Promise<R>;
}
