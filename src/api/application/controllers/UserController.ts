import { NextFunction, Request, Response } from 'express';
import Ioc from '@api/infrastructure/inversify';
import RegisterUser from '../handlers/user/FindByEmail';
import logger from '@core/infrastructure/logger';

class UserController {
	public async findByEmail(req: Request, res: Response, next: NextFunction) {
		const data = await Ioc.get(RegisterUser).handle(req);
		return res.status(200).json(data);
	}
}

export default new UserController();
