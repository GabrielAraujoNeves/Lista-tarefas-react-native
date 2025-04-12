import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    ManyToOne, 
    JoinColumn, 
    OneToMany,
    UpdateDateColumn 
} from "typeorm";
import { User } from "./User";
import { Task } from "./Task";

@Entity("Lists")
export class List {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "user_id", type: "integer", nullable: false })
    userId: number;

    @Column({ name: "label", type: "varchar", nullable: false, length: 255 })
    label: string;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt: Date;

    @Column({ name: "finished", type: "timestamptz", nullable: true })
    finishedAt: Date | null;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamptz", nullable: true })
    deletedAt: Date | null;

    // Relacionamentos
    @ManyToOne(() => User, (user) => user.lists)
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    user: User;

    @OneToMany(() => Task, (task) => task.list)
    tasks: Task[];
}