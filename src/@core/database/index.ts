/* This TypeScript code snippet is setting up a data source configuration for a database connection
using TypeORM. Here's a breakdown of what the code is doing: */

import logger from '@core/infrastructure/logger';
import '@env/index.js';
import { DataSource } from 'typeorm';

logger.info('Initializing Data Source...');

const AppDataSource = new DataSource({
	type: (process.env.DB_TYPE as 'postgres' | 'mysql') || 'postgres',
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities: ['src/@core/domain/entities/**/*{.ts,.js}'],
	migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
});

export default AppDataSource;
