import { FastifyInstance } from "fastify";
import * as AuthRoutes from './auth.routes'; // importa o configure
import * as LisRoutes from './list.route'
import * as TaskRoutes from "./task.route"

export const register = (fastify: FastifyInstance) => {
  fastify.register((instance, _, done) => {
    AuthRoutes.configure(instance); 
    LisRoutes.configure(instance);
    TaskRoutes.configure(instance);
    done();
  });
};
