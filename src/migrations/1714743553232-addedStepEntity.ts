import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedStepEntity1714743553232 implements MigrationInterface {
    name = 'AddedStepEntity1714743553232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "step" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_70d386ace569c3d265e05db0cc7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service_steps_step" ("serviceId" integer NOT NULL, "stepId" integer NOT NULL, CONSTRAINT "PK_c64346bb02d5eb22874e192d193" PRIMARY KEY ("serviceId", "stepId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4f9924af4c2713f4f8950869ba" ON "service_steps_step" ("serviceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_265d45180e4fe0adec50411fe9" ON "service_steps_step" ("stepId") `);
        await queryRunner.query(`ALTER TABLE "service_steps_step" ADD CONSTRAINT "FK_4f9924af4c2713f4f8950869bae" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "service_steps_step" ADD CONSTRAINT "FK_265d45180e4fe0adec50411fe90" FOREIGN KEY ("stepId") REFERENCES "step"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service_steps_step" DROP CONSTRAINT "FK_265d45180e4fe0adec50411fe90"`);
        await queryRunner.query(`ALTER TABLE "service_steps_step" DROP CONSTRAINT "FK_4f9924af4c2713f4f8950869bae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_265d45180e4fe0adec50411fe9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4f9924af4c2713f4f8950869ba"`);
        await queryRunner.query(`DROP TABLE "service_steps_step"`);
        await queryRunner.query(`DROP TABLE "step"`);
    }

}
