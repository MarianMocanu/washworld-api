import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedServiceEntity1714742917637 implements MigrationInterface {
    name = 'AddedServiceEntity1714742917637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."service_type_enum" AS ENUM('auto', 'self', 'vacuum')`);
        await queryRunner.query(`CREATE TABLE "service" ("id" SERIAL NOT NULL, "type" "public"."service_type_enum" NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TYPE "public"."service_type_enum"`);
    }

}
