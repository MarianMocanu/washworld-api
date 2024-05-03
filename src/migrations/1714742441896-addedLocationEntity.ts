import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedLocationEntity1714742441896 implements MigrationInterface {
    name = 'AddedLocationEntity1714742441896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."location_status_enum" AS ENUM('available', 'maintenance', 'closed')`);
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "streetName" character varying NOT NULL, "streetNumber" character varying NOT NULL, "postalCode" character varying NOT NULL, "openingHours" json NOT NULL, "status" "public"."location_status_enum" NOT NULL DEFAULT 'available', "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TYPE "public"."location_status_enum"`);
    }

}
