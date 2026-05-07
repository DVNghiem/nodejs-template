import { MigrationInterface, QueryRunner } from 'typeorm';

export class AutoGenerate1778142569663 implements MigrationInterface {
	name = 'AutoGenerate1778142569663';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT now()`);
		await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
		await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
		await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" DROP DEFAULT`);
		await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" DROP DEFAULT`);
	}
}
