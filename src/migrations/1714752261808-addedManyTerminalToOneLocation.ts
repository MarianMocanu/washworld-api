import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedManyTerminalToOneLocation1714752261808 implements MigrationInterface {
  name = 'AddedManyTerminalToOneLocation1714752261808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."terminal_status_enum" AS ENUM('idle', 'busy', 'maintenance', 'closed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "terminal" ("id" SERIAL NOT NULL, "status" "public"."terminal_status_enum" NOT NULL DEFAULT 'idle', "locationId" integer, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_5404f9799fb761bd9b01070356a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "terminal" ADD CONSTRAINT "FK_66c21a89f634f23b2637472fe98" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "terminal" DROP CONSTRAINT "FK_66c21a89f634f23b2637472fe98"`,
    );
    await queryRunner.query(`DROP TABLE "terminal"`);
    await queryRunner.query(`DROP TYPE "public"."terminal_status_enum"`);
  }
}

