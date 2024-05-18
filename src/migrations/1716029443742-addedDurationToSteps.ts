import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedDurationToSteps1716029443742 implements MigrationInterface {
  name = 'AddedDurationToSteps1716029443742';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "services_terminals" DROP CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed"`,
    );
    await queryRunner.query(`ALTER TABLE "step" ADD "duration" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "services_terminals" ADD CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "services_terminals" DROP CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed"`,
    );
    await queryRunner.query(`ALTER TABLE "step" DROP COLUMN "duration"`);
    await queryRunner.query(
      `ALTER TABLE "services_terminals" ADD CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
