import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNullConstraints1714756327767 implements MigrationInterface {
    name = 'AddedNullConstraints1714756327767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_887f9555bf62bd5ad1e89d6dd8c"`);
        await queryRunner.query(`ALTER TABLE "subscription" ALTER COLUMN "levelId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "terminal" DROP CONSTRAINT "FK_66c21a89f634f23b2637472fe98"`);
        await queryRunner.query(`ALTER TABLE "terminal" ALTER COLUMN "locationId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_de2ee0a6b941274e98221d19e32"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_2ece0cf7338db5bc51807f35d8a"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_128120d9fd6c994c186265be4f9"`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "carId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "serviceId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "terminalId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36"`);
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_887f9555bf62bd5ad1e89d6dd8c" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "terminal" ADD CONSTRAINT "FK_66c21a89f634f23b2637472fe98" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_de2ee0a6b941274e98221d19e32" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_2ece0cf7338db5bc51807f35d8a" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_128120d9fd6c994c186265be4f9" FOREIGN KEY ("terminalId") REFERENCES "terminal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_128120d9fd6c994c186265be4f9"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_2ece0cf7338db5bc51807f35d8a"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_de2ee0a6b941274e98221d19e32"`);
        await queryRunner.query(`ALTER TABLE "terminal" DROP CONSTRAINT "FK_66c21a89f634f23b2637472fe98"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_887f9555bf62bd5ad1e89d6dd8c"`);
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_a4f3cb1b950608959ba75e8df36" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "terminalId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "serviceId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "carId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_128120d9fd6c994c186265be4f9" FOREIGN KEY ("terminalId") REFERENCES "terminal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_2ece0cf7338db5bc51807f35d8a" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_de2ee0a6b941274e98221d19e32" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "terminal" ALTER COLUMN "locationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "terminal" ADD CONSTRAINT "FK_66c21a89f634f23b2637472fe98" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ALTER COLUMN "levelId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_887f9555bf62bd5ad1e89d6dd8c" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
