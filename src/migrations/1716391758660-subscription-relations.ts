import { MigrationInterface, QueryRunner } from "typeorm";

export class SubscriptionRelations1716391758660 implements MigrationInterface {
    name = 'SubscriptionRelations1716391758660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_3fabaea4a75800a48816cd16ac7"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_887f9555bf62bd5ad1e89d6dd8c"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "UQ_3fabaea4a75800a48816cd16ac7"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "UQ_887f9555bf62bd5ad1e89d6dd8c"`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_3fabaea4a75800a48816cd16ac7" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_887f9555bf62bd5ad1e89d6dd8c" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_887f9555bf62bd5ad1e89d6dd8c"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_3fabaea4a75800a48816cd16ac7"`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "UQ_887f9555bf62bd5ad1e89d6dd8c" UNIQUE ("levelId")`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "UQ_3fabaea4a75800a48816cd16ac7" UNIQUE ("carId")`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_887f9555bf62bd5ad1e89d6dd8c" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_3fabaea4a75800a48816cd16ac7" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
