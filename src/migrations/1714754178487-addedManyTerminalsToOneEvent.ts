import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedManyTerminalsToOneEvent1714754178487 implements MigrationInterface {
  name = 'AddedManyTerminalsToOneEvent1714754178487';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ADD "terminalId" integer`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_128120d9fd6c994c186265be4f9" FOREIGN KEY ("terminalId") REFERENCES "terminal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_128120d9fd6c994c186265be4f9"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "terminalId"`);
  }
}

