import fastify from "fastify";
import { AppDataSource } from "./database/typeorm/data-source";
import 'dotenv/config';
import * as Routes from './routes';

(async () => {
  const app = fastify();

  Routes.register(app)

  await AppDataSource.initialize();

  app.listen({ port: 3001 }, () => {
    console.log("API rodando na porta 3001");
  });
  console.log("Chave secreta carregada:", process.env.APP_SECRETET_KEY);


})();
