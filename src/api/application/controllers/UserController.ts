import { NextFunction, Request, Response  } from 'express';
import Ioc from '@api/infrastructure/inversify';
import RegisterUser from '../handlers/user/Register';
import logger from '@core/infrastructure/logger';

class UserController {
	public async register(req: Request, res: Response, next: NextFunction) {
		const data = await Ioc.get(RegisterUser).handle(req);
		return res.status(200).json(data.toJSON);
	}
}

export default new UserController();
