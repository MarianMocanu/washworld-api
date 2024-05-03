import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedManyServicesToManyTerminals1714752382209 implements MigrationInterface {
    name = 'AddedManyServicesToManyTerminals1714752382209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "services_terminals" ("serviceId" integer NOT NULL, "terminalId" integer NOT NULL, CONSTRAINT "PK_a3aa4a39f97e117f6f4dd850745" PRIMARY KEY ("serviceId", "terminalId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6399d8c0bc5b2607a21b55da2e" ON "services_terminals" ("serviceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6328896f36ad0d9e5e39d3448b" ON "services_terminals" ("terminalId") `);
        await queryRunner.query(`ALTER TABLE "services_terminals" ADD CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "services_terminals" ADD CONSTRAINT "FK_6328896f36ad0d9e5e39d3448b8" FOREIGN KEY ("terminalId") REFERENCES "terminal"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_terminals" DROP CONSTRAINT "FK_6328896f36ad0d9e5e39d3448b8"`);
        await queryRunner.query(`ALTER TABLE "services_terminals" DROP CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6328896f36ad0d9e5e39d3448b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6399d8c0bc5b2607a21b55da2e"`);
        await queryRunner.query(`DROP TABLE "services_terminals"`);
    }

}
