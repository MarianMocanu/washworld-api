import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedLevelEntityAndRelation1714746598713 implements MigrationInterface {
    name = 'AddedLevelEntityAndRelation1714746598713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "level" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services_levels" ("serviceId" integer NOT NULL, "levelId" integer NOT NULL, CONSTRAINT "PK_7ac4f8aa1908d14060053d7191d" PRIMARY KEY ("serviceId", "levelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_711bca8feeac907cb72726d9dd" ON "services_levels" ("serviceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d38539349c1ea0297366e9104" ON "services_levels" ("levelId") `);
        await queryRunner.query(`ALTER TABLE "services_levels" ADD CONSTRAINT "FK_711bca8feeac907cb72726d9dd3" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "services_levels" ADD CONSTRAINT "FK_5d38539349c1ea0297366e91041" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_levels" DROP CONSTRAINT "FK_5d38539349c1ea0297366e91041"`);
        await queryRunner.query(`ALTER TABLE "services_levels" DROP CONSTRAINT "FK_711bca8feeac907cb72726d9dd3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d38539349c1ea0297366e9104"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_711bca8feeac907cb72726d9dd"`);
        await queryRunner.query(`DROP TABLE "services_levels"`);
        await queryRunner.query(`DROP TABLE "level"`);
    }

}
