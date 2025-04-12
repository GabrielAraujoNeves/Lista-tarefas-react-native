import { FastifyRequest } from "fastify";
import { AuthTypeormRepository } from "../repositories/auths.respository";
import jwt from "jsonwebtoken";

export class CheckAuthtenticationMiddleware {
    private authRepository: AuthTypeormRepository;

    constructor () {
        this.authRepository = new AuthTypeormRepository();
    }

    execute = async (request: FastifyRequest) => {
        const authorizationHeader =  request.headers?.authorization

        if (!authorizationHeader) {
            throw new Error("sem autorização")
        }

        const [, token] = authorizationHeader.split(' ')

        if (!token || token === "") {
            throw new Error("Não possui token")
        }

        const { email } = jwt.verify(token, process.env.APP_SECRETET_KEY)

        try {
            const user = await this.authRepository.findByEmail(email)
            request.user = user            
        } catch (error) {
            throw new Error("Falha ao Buscar usuário");
        }
    }
}