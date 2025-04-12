import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1743920480609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "name",
            type: "varchar",
            length: "50",
            isNullable: false
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false
          },
          {
            name: "created_at",
            type: "timestamptz",
            isNullable: false,
            default: "now()"
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Users");
  }
}
