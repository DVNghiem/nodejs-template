import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as 'postgres' | 'mysql' || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
});

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
	})
	.catch(err => {
		console.error('Error during Data Source initialization', err);
	});
