import { MigrationInterface, QueryRunner } from "typeorm";

export class ServicesTerminalsManyToMany1715892482354 implements MigrationInterface {
    name = 'ServicesTerminalsManyToMany1715892482354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_terminals" DROP CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed"`);
        await queryRunner.query(`ALTER TABLE "services_terminals" ADD CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_terminals" DROP CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed"`);
        await queryRunner.query(`ALTER TABLE "services_terminals" ADD CONSTRAINT "FK_6399d8c0bc5b2607a21b55da2ed" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
