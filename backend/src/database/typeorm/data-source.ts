import "reflect-metadata";
import { DataSource } from "typeorm";
import path = require("path");
import { User } from "./entity/User";
import { List } from "./entity/List";
import { Task } from "./entity/Task";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "todo_dev_db",
    password: "todo_dev_db",
    database: "todo_dev_db",
    synchronize: true,
    logging: false,
    entities: [User, List, Task],
    migrations: [path.resolve(__dirname, "migrations", "*{.ts,.js}")],
    subscribers: [],
});
