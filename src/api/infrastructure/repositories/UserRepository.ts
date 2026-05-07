import IUserRepository from '@api/domain/repositories/IUserRepository';
import User from '@core/domain/entities/User';
import UserRepositoryCore from '@core/infrastructure/repositories/UserRepository';
import { injectable } from 'inversify';

@injectable()
export default class UserRepository extends UserRepositoryCore implements IUserRepository {
	async findByEmail(email: string): Promise<User | undefined> {
		return (await this.findOne({ where: { email } })) ?? undefined;
	}
}
