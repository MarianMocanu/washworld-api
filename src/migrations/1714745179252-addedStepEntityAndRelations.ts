import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedStepEntityAndRelations1714745179252 implements MigrationInterface {
    name = 'AddedStepEntityAndRelations1714745179252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "step" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_70d386ace569c3d265e05db0cc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services_steps" ("serviceId" integer NOT NULL, "stepId" integer NOT NULL, CONSTRAINT "PK_90139f4d51888461cabf67675ab" PRIMARY KEY ("serviceId", "stepId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_14c297d9deb1e7782385ed1314" ON "services_steps" ("serviceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_50e991899826214a026fe5f6e9" ON "services_steps" ("stepId") `);
        await queryRunner.query(`ALTER TABLE "services_steps" ADD CONSTRAINT "FK_14c297d9deb1e7782385ed1314d" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "services_steps" ADD CONSTRAINT "FK_50e991899826214a026fe5f6e98" FOREIGN KEY ("stepId") REFERENCES "step"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_steps" DROP CONSTRAINT "FK_50e991899826214a026fe5f6e98"`);
        await queryRunner.query(`ALTER TABLE "services_steps" DROP CONSTRAINT "FK_14c297d9deb1e7782385ed1314d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_50e991899826214a026fe5f6e9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_14c297d9deb1e7782385ed1314"`);
        await queryRunner.query(`DROP TABLE "services_steps"`);
        await queryRunner.query(`DROP TABLE "step"`);
    }

}
