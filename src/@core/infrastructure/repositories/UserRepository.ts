import AppDataSource from '@core/database';
import User from '@core/domain/entities/User';
import { injectable } from 'inversify';
import { Repository as BaseRepository } from 'typeorm';
import Repository from './Repository';

@injectable()
export default class UserRepositoryCore extends Repository<User, BaseRepository<User>> {
	constructor() {
		super(AppDataSource.getRepository(User));
	}
}
