import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAccountsTable1647809893194 implements MigrationInterface {
  name = 'createAccountsTable1647809893194';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "cpf" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_b3024212b848c9b483e3e6a1a91" UNIQUE ("cpf"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "accounts"`);
  }
}
