import IUserRepository from '@api/domain/repositories/IUserRepository';
import UserRepositoryCore from '@core/infrastructure/mongoose/repositories/UserRepository';
import { injectable } from 'inversify';
import User from '@core/domain/entities/User';
import UserModel from '@core/infrastructure/mongoose/models/User';

@injectable()
export default class UserRepository extends UserRepositoryCore implements IUserRepository {}
