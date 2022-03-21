import {MigrationInterface, QueryRunner} from "typeorm";

export class addBalanceColumnToAccounts1647818780710 implements MigrationInterface {
    name = 'addBalanceColumnToAccounts1647818780710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "balance" numeric(12,2) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "balance"`);
    }

}
