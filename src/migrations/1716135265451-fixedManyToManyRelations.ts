import { MigrationInterface, QueryRunner } from "typeorm";

export class FixedManyToManyRelations1716135265451 implements MigrationInterface {
    name = 'FixedManyToManyRelations1716135265451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_steps" DROP CONSTRAINT "FK_14c297d9deb1e7782385ed1314d"`);
        await queryRunner.query(`ALTER TABLE "services_terminals" DROP CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed"`);
        await queryRunner.query(`ALTER TABLE "services_steps" ADD CONSTRAINT "FK_14c297d9deb1e7782385ed1314d" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "services_terminals" ADD CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_terminals" DROP CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed"`);
        await queryRunner.query(`ALTER TABLE "services_steps" DROP CONSTRAINT "FK_14c297d9deb1e7782385ed1314d"`);
        await queryRunner.query(`ALTER TABLE "services_terminals" ADD CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services_steps" ADD CONSTRAINT "FK_14c297d9deb1e7782385ed1314d" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
