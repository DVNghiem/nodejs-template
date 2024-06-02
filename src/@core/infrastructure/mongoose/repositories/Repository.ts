
import { IEntity } from '@core/domain/entities/Entity';
import IRepository from '@core/domain/repositories/IRepository';
import { Model } from 'mongoose';
import { injectable } from 'inversify';
import { HydratedDocument } from 'mongoose';
import logger from '@core/infrastructure/logger';

@injectable()
export default abstract class Repository<E extends IEntity, T> implements IRepository<E> {
	protected readonly _model: Model<T>;
	protected abstract convertDocumentToEntity(persist: HydratedDocument<T>): E;

	constructor(model: Model<T>) {
		this._model = model;
	}

	async add(entity: E): Promise<E> {
		const doc = await this._model.create(entity.props);
		return this.convertDocumentToEntity(doc);
	}

	async delete(entity: E): Promise<E> {
		const e = await this._model.findByIdAndDelete({ _id: entity.id });
		return this.convertDocumentToEntity(e?.toObject() as HydratedDocument<T>);
	}
	async update(entity: E): Promise<E> {
		const e = await this._model.findByIdAndUpdate({ _id: entity.id }, entity);
		return this.convertDocumentToEntity(e?.toObject() as HydratedDocument<T>);
	}
	async findOneById(id: string): Promise<E | null> {
		const e = await this._model.findById(id);
		return e ? this.convertDocumentToEntity(e.toObject() as HydratedDocument<T>) : null;
	}
	async all(): Promise<E[]> {
		const e = await this._model.find();
		return e.map(this.convertDocumentToEntity);
	}
}
