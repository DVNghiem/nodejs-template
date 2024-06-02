import { NextFunction, Request, Response } from 'express';
import Ioc from '@api/infrastructure/inversify';
import SaveTransaction from '../handlers/transaction/SaveTransaction';
import FindTransaction from '../handlers/transaction/FindTransaction';

class TransactionController {
	
	async saveTransaction(req: Request, res: Response, next: NextFunction) {
		const data = await Ioc.get(SaveTransaction).handle(req);
		return res.status(200).json(data);
	}

	async getTransaction(req: Request, res: Response, next: NextFunction) {
		const data = await Ioc.get(FindTransaction).handle(req);
		return res.status(200).json(data);
	}
}

export default new TransactionController();
