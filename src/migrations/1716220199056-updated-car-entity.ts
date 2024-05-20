import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCarEntity1716220199056 implements MigrationInterface {
    name = 'UpdatedCarEntity1716220199056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "UQ_a252641f9c279953f2a2a74c97a" UNIQUE ("plateNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "UQ_a252641f9c279953f2a2a74c97a"`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "name"`);
    }

}
