import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateListsTable1743922363043 implements MigrationInterface {

     public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(
         new Table({
           name: "Lists",
           columns: [
             {
               name: "id",
               type: "int",
               isPrimary: true,
               isGenerated: true,
               generationStrategy: "increment"
             },
             {
               name: "user_id",
               type: "int",
               isNullable: false
             },
             {
               name: "label",
               type: "varchar",
               isNullable: false
             },
             {
               name: "created_at",
               type: "timestamptz",
               isNullable: false,
               default: "now()"
             },
             {
                name: "finished",
                type: "timestamptz",
                isNullable: true
              },
              {
                name: "deleted_at",
                type: "timestamptz",
                isNullable: true
              },
           ]
        }));

        await queryRunner.createForeignKey("Lists", new TableForeignKey({
            name: "FK_user_id",
            columnNames: ["user_id"],
            referencedTableName: "Users",
            referencedColumnNames:["id"]
        }))
     }
   
     public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("Lists", "FK_user_id")
       await queryRunner.dropTable("Lists");
     }
}
