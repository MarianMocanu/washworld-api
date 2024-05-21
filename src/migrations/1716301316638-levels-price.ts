import { MigrationInterface, QueryRunner } from "typeorm";

export class LevelsPrice1716301316638 implements MigrationInterface {
    name = 'LevelsPrice1716301316638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "level" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "level" DROP COLUMN "price"`);
    }

}
