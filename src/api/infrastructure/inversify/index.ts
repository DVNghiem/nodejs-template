import 'reflect-metadata';
import { Container } from 'inversify';
import ErrorCollector from '@core/infrastructure/utilities/ErrorCollector';
import UserRepository from '../repositories/UserRepository';
import IUserRepository from '@api/domain/repositories/IUserRepository';

const container = new Container({
	autoBindInjectable: true,
	skipBaseClassChecks: true,
});

// Utilities
container.bind<ErrorCollector>('ErrorCollector').to(ErrorCollector);

// Repositories
container.bind<IUserRepository>('UserRepository').to(UserRepository);

export default container;
