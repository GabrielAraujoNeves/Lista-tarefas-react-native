import { User } from "../database/typeorm/entity/User";

export interface AuthResponse {
    user: User;
    token: string;
}