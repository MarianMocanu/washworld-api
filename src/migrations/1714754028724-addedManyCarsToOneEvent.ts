import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedManyCarsToOneEvent1714754028724 implements MigrationInterface {
    name = 'AddedManyCarsToOneEvent1714754028724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "carId" integer`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_de2ee0a6b941274e98221d19e32" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_de2ee0a6b941274e98221d19e32"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "carId"`);
    }

}
