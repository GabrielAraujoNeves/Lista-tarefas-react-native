import { AuthLoginRequest } from "../interfaces/authLoginRequest";
import { AuthResponse } from "../interfaces/authResponse";
import { AuthTypeormRepository } from "../repositories/auths.respository";
import { CreateUserParams } from "../repositories/interfaces/AuthRepository.interface";
import { hashSync, compare } from 'bcrypt';
import { sign } from "jsonwebtoken";

export class AuthLogic {
  private authRepository: AuthTypeormRepository;

  constructor() {
    this.authRepository = new AuthTypeormRepository();
  }

  async createUser(user: CreateUserParams): Promise<AuthResponse> {
    const userAlreadyExists = await this.authRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new Error("O e-mail já está cadastrado");
    }

    const encryptedPassword = hashSync(user.password, 10);

    const userCreated = await this.authRepository.createUser({
      ...user,
      password: encryptedPassword,
    });

    const token = sign(
        {
          id: userCreated.id,
          email: userCreated.email,
        },
        process.env.APP_SECRETET_KEY as string,
        {
          expiresIn: "356d",
          algorithm: "HS256",
        }
      );

    delete userCreated.password;

    return {
      token,
      user: userCreated,
    };
  }

  async login({ email, password }: AuthLoginRequest): Promise<AuthResponse> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const checkPassword = await compare(password, user.password); // await aqui

    if (!checkPassword) {
      throw new Error("A senha está inválida!");
    }

    const token = sign(
        {
          id: user.id,
          email: email,
        },
        process.env.APP_SECRETET_KEY as string,
        {
          expiresIn: "356d",
          algorithm: "HS256",
        }
      );
    delete user.password;

    return {
      token,
      user,
    };
  }
}
