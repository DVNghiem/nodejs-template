/**
 * This is abstract class for handling request
 * function handle is abstract and should be implemented in the child class
 * 	- handle is the function that will be called when the request is received
 * function validate is used to validate the request
 * 	- validate is called before the handle function
 * 
 */

import { injectable, inject } from 'inversify';
import ErrorCollector from '@core/infrastructure/utilities/ErrorCollector';
import { Request } from 'express';

@injectable()
export default abstract class RequestHandler {
	@inject('ErrorCollector') protected errorCollector!: ErrorCollector;

	protected async validate(request: Request): Promise<any> {}

	public abstract handle(request: Request): Promise<any>;
}
