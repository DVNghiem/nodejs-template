import User from '@core/domain/entities/User';
import IRepository from '@core/domain/repositories/IRepository';

export default interface IUserRepository extends IRepository<User> {
	findByEmail(email: string): Promise<User | undefined>;
}
