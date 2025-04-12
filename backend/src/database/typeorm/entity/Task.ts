import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { List } from "./List"

@Entity("Tasks")
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: "list_id", type: "varchar", nullable: false })
    listId: number

    @Column({name: "label", type: "varchar", nullable: false })
    label: string

    @CreateDateColumn({name: "created_at", type: "timestamptz", nullable: false })
    createdAt: Date

    @Column({name: "finished", type: "timestamptz", nullable: true })
    finishedAt: Date

   @DeleteDateColumn({ name: "deleted_at", type: "timestamptz", nullable: true})
   deletedAt: Date | null

   @ManyToOne(() => List, (list) => list.tasks)
   @JoinColumn({ name: 'list_id', referencedColumnName: 'id' })
   list: List 
}
