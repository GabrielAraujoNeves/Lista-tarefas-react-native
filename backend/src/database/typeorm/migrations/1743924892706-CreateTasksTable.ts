import { MigrationInterface, QueryRunner,Table,TableForeignKey } from "typeorm";

export class CreateTasksTable1743924892706 implements MigrationInterface {

     public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(
           new Table({
             name: "Tasks",
             columns: [
               {
                 name: "id",
                 type: "int",
                 isPrimary: true,
                 isGenerated: true,
                 generationStrategy: "increment"
               },
               {
                 name: "list_id",
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
  
          await queryRunner.createForeignKey("Tasks", new TableForeignKey({
              name: "FK_list_id",
              columnNames: ["List_id"],
              referencedTableName: "Lists",
              referencedColumnNames:["id"]
          }))
       }
     
       public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.dropForeignKey("Tasks", "FK_list_id")
         await queryRunner.dropTable("Tasks");
       }
}
