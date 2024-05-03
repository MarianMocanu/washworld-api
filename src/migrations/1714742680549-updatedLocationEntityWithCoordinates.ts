import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedLocationEntityWithCoordinates1714742680549 implements MigrationInterface {
    name = 'UpdatedLocationEntityWithCoordinates1714742680549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ADD "coordinates" json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "coordinates"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "image"`);
    }

}
