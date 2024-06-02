import RequestHandler from '@core/application/RequestHandler';
import PositiveNumber from '@core/domain/validate-objects/PositiveNumber';
import ITransactionDao from '@api/domain/daos/TransactionDao';
import { inject, injectable } from 'inversify';

interface ValidatedInput {
	id: string;
	masterAccountNumber?: string;
}

@injectable()
export default class FindTransaction extends RequestHandler {
	@inject('TransactionDao') private transactionDao!: ITransactionDao;

	async validate(request: any): Promise<ValidatedInput> {
		const id = this.errorCollector.collect('id', () => PositiveNumber.validate({ value: request.params.id, required: false }));
		const masterAccountNumber = this.errorCollector.collect('masterAccountNumber', () =>
			PositiveNumber.validate({ value: request.query.masterAccountNumber, required: false })
		);
		return { id, masterAccountNumber };
	}

	async handle(request: any) {
		const input = await this.validate(request);
        const result = await this.transactionDao.findAll(input.id, input.masterAccountNumber);
		return result;
	}
}
