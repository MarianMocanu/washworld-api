import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedEntitesWithUpdatedAtColumn1716135733178 implements MigrationInterface {
    name = 'UpdatedEntitesWithUpdatedAtColumn1716135733178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "step" ADD "updatedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ADD "updatedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service" ADD "updatedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "level" ADD "updatedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "level" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "step" DROP COLUMN "updatedAt"`);
    }

}
