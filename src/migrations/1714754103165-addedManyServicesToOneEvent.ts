import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedManyServicesToOneEvent1714754103165 implements MigrationInterface {
  name = 'AddedManyServicesToOneEvent1714754103165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ADD "serviceId" integer`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_2ece0cf7338db5bc51807f35d8a" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_2ece0cf7338db5bc51807f35d8a"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "serviceId"`);
  }
}

