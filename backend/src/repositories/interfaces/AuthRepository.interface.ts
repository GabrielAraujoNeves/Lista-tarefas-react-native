import { User } from "../../database/typeorm/entity/User";

export interface CreateUserParams {
    name: string;
    email: string;
    password: string
}

export interface AuthRespositoryInterface {
    createUser(User: CreateUserParams): Promise<User>;
    findByEmail(email: string): Promise<User | null>; // 👈 aqui
}