import { Repository } from "typeorm";
import { User } from "../database/typeorm/entity/User";
import { AuthRespositoryInterface, CreateUserParams } from "./interfaces/AuthRepository.interface";
import { AppDataSource } from "../database/typeorm/data-source";

export class AuthTypeormRepository implements AuthRespositoryInterface {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async createUser(User: CreateUserParams): Promise<User> {
        try {
            const userCreated = await this.userRepository.save(User);
            return userCreated;
        } catch (error) {
            throw new Error("Falha ao criar usuário");
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({
                where: { email }
            });
    
            return user; // pode ser null se não existir
        } catch (error) {
            console.error("Erro em findByEmail:", error); // <-- loga o erro real no terminal
            throw new Error("Falha ao buscar usuário");
        }
    }
}
