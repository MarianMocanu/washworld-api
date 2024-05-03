import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedManySubscriptionsToOneLevel1714751762554 implements MigrationInterface {
    name = 'AddedManySubscriptionsToOneLevel1714751762554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" ADD "levelId" integer`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_887f9555bf62bd5ad1e89d6dd8c" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_887f9555bf62bd5ad1e89d6dd8c"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "levelId"`);
    }

}
