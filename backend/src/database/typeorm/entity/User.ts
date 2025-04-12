import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import { List } from "./List"

@Entity("Users") // <-- nome da tabela com 's'
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "name", type: "varchar", nullable: false })
    name: string

    @Column({ name: "email", type: "varchar", nullable: false })
    email: string

    @Column({ name: "password", type: "varchar", nullable: false })
    password: string

    @CreateDateColumn({ name: "created_at" }) // <-- nome mais padrão
    createdAt: Date

    @OneToMany(() => List, (list) => list.user)
    lists: List[]
}
