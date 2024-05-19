import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedSubscriptionFromCar1716113872172 implements MigrationInterface {
    name = 'RemovedSubscriptionFromCar1716113872172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_09c6eb60206b1340816f3687b63"`);
        await queryRunner.query(`ALTER TABLE "services_terminals" DROP CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "UQ_09c6eb60206b1340816f3687b63"`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "subscriptionId"`);
        await queryRunner.query(`ALTER TABLE "services_terminals" ADD CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_terminals" DROP CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "subscriptionId" integer`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "UQ_09c6eb60206b1340816f3687b63" UNIQUE ("subscriptionId")`);
        await queryRunner.query(`ALTER TABLE "services_terminals" ADD CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_09c6eb60206b1340816f3687b63" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
