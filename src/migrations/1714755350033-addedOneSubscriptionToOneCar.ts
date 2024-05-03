import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedOneSubscriptionToOneCar1714755350033 implements MigrationInterface {
    name = 'AddedOneSubscriptionToOneCar1714755350033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ADD "subscriptionId" integer`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "UQ_09c6eb60206b1340816f3687b63" UNIQUE ("subscriptionId")`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_09c6eb60206b1340816f3687b63" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_09c6eb60206b1340816f3687b63"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "UQ_09c6eb60206b1340816f3687b63"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "subscriptionId"`);
    }

}
