import IUserRepository from '@api/domain/repositories/IUserRepository';
import RequestHandler from '@core/application/RequestHandler';
import User from '@core/domain/entities/User';
import logger from '@core/infrastructure/logger';
import { inject, injectable } from 'inversify';

interface ValidatedInput {
	email: string;
}

@injectable()
export default class RegisterUser extends RequestHandler {
	@inject('UserRepository') private userRepository!: IUserRepository;

	async validate(request: any): Promise<ValidatedInput> {
		return {
			email: request.query.email,
		};
	}

	async handle(request: any) {
		const input = await this.validate(request);
		const entity = await this.userRepository.findByEmail(input.email);
		logger.info(`User found: ${entity}`);
		return entity;
	}
}
