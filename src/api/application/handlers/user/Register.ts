import IUserRepository from "@api/domain/repositories/IUserRepository";
import RequestHandler from "@core/application/RequestHandler";
import User from "@core/domain/entities/User";
import logger from "@core/infrastructure/logger";
import { inject, injectable } from "inversify";


interface ValidatedInput {
    username: string;
    age: number;
}

@injectable()
export default class RegisterUser extends RequestHandler{

    @inject('UserRepository') private userRepository!: IUserRepository;

    async validate(request: any): Promise<ValidatedInput> {
        return {
            username: request.body.username,
            age: request.body.age
        };
    }

    async handle(request: any) {
        const input = await this.validate(request);
        const entity = User.create({
            username: input.username,
            age: input.age
        });
        logger.info(entity)
        const result = await this.userRepository.add(entity);
        return result;
    }
}
