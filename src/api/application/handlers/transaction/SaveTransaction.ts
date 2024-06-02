import { inject, injectable } from 'inversify';
import RequestHandler from '@core/application/RequestHandler';
import ValidationError from '@core/domain/errors/ValidationError';
import { Request } from 'express';
import Text from '@core/domain/validate-objects/Text';
import ITransactionDao from '@api/domain/daos/TransactionDao';
import Transaction from '@core/domain/entities/Transaction';

interface ValidatedInput {
	masterAccountNumber: string;
}

@injectable()
export default class SaveTransaction extends RequestHandler {

	@inject('TransactionDao') private transactionDao!: ITransactionDao;
	async validate(request: Request): Promise<ValidatedInput> {
		const masterAccountNumber = this.errorCollector.collect('masterAccountNumber', () =>
			Text.validate({ value: request.body['masterAccountNumber'], required: false })
		);
		if (this.errorCollector.hasError()) {
			throw new ValidationError(this.errorCollector.errors);
		}
		return { masterAccountNumber };
	}

	async handle(request: Request) {
		const input = await this.validate(request);
		const entity = Transaction.create({
			masterAccountNumber: input.masterAccountNumber,
		});
		const transaction = await this.transactionDao.insertEntity(entity);
		return transaction.toJSON;
	}
}
