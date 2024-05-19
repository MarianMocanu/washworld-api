import { MigrationInterface, QueryRunner } from "typeorm";

export class FixedManyToManyRelations1716140876889 implements MigrationInterface {
    name = 'FixedManyToManyRelations1716140876889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_steps" DROP CONSTRAINT "FK_50e991899826214a026fe5f6e98"`);
        await queryRunner.query(`ALTER TABLE "services_levels" DROP CONSTRAINT "FK_5d38539349c1ea0297366e91041"`);
        await queryRunner.query(`ALTER TABLE "services_terminals" DROP CONSTRAINT "FK_6328896f36ad0d9e5e39d3448b8"`);
        await queryRunner.query(`ALTER TABLE "services_steps" ADD CONSTRAINT "FK_50e991899826214a026fe5f6e98" FOREIGN KEY ("stepId") REFERENCES "step"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services_levels" ADD CONSTRAINT "FK_5d38539349c1ea0297366e91041" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services_terminals" ADD CONSTRAINT "FK_6328896f36ad0d9e5e39d3448b8" FOREIGN KEY ("terminalId") REFERENCES "terminal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services_terminals" DROP CONSTRAINT "FK_6328896f36ad0d9e5e39d3448b8"`);
        await queryRunner.query(`ALTER TABLE "services_levels" DROP CONSTRAINT "FK_5d38539349c1ea0297366e91041"`);
        await queryRunner.query(`ALTER TABLE "services_steps" DROP CONSTRAINT "FK_50e991899826214a026fe5f6e98"`);
        await queryRunner.query(`ALTER TABLE "services_terminals" ADD CONSTRAINT "FK_6328896f36ad0d9e5e39d3448b8" FOREIGN KEY ("terminalId") REFERENCES "terminal"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "services_levels" ADD CONSTRAINT "FK_5d38539349c1ea0297366e91041" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "services_steps" ADD CONSTRAINT "FK_50e991899826214a026fe5f6e98" FOREIGN KEY ("stepId") REFERENCES "step"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
