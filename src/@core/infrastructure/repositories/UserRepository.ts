import { injectable } from 'inversify';
import Repository from './Repository';
import { Repository as BaseRepository, DeleteResult } from 'typeorm';
import User from '@core/domain/entities/User';
import { EntityId } from 'typeorm/repository/EntityId';
import AppDataSource from '@core/database';

@injectable()
export default class UserRepositoryCore extends Repository<User, BaseRepository<User>> {
	public softDelete(id: EntityId): Promise<DeleteResult> {
		throw new Error('Method not implemented.');
	}

	constructor() {
		super(AppDataSource.getRepository(User));
	}
}
