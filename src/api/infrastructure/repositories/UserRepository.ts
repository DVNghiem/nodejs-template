import IUserRepository from '@api/domain/repositories/IUserRepository';
import { injectable } from 'inversify';
import User from '@core/domain/entities/User';
import UserRepositoryCore from '@core/infrastructure/repositories/UserRepository';

@injectable()
export default class UserRepository extends UserRepositoryCore implements IUserRepository {
	async findByEmail(email: string): Promise<User | undefined> {
		const query = this.initQuery();
		return (await query.select().where('email = :email', { email }).getOne()) ?? undefined;
	}
}
