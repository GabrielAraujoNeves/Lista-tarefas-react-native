import { FastifyInstance } from "fastify";
import ListController from "../controller/list.controller";
import { CreateListSchema, deleteListSchema, findListSchema, finishListSchema, upadateListSchema } from "./schemas/list.schema";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";

export const configure = (fastify: FastifyInstance) => {

    const  listController = new ListController();

    const checkAuthMiddleware =  new CheckAuthtenticationMiddleware()

    fastify.route({
      url: "/lists/create",
      method: "post",
      preHandler: checkAuthMiddleware.execute,
      handler: listController.createLists,
      schema: CreateListSchema
    })

    fastify.route({
      url: "/lists/upadate",
      method: "put",
      preHandler: checkAuthMiddleware.execute,
      handler: listController.updateLists,
      schema: upadateListSchema
    })

    fastify.route({
      url: "/lists/delete/:listId", 
      method: "DELETE",  // Método em maiúsculas (convenção)
      preHandler: checkAuthMiddleware.execute,
      handler: listController.deleteLists,
      schema: deleteListSchema
    })

    fastify.route({
      url: "/lists/:userId",
      method: "get",
      preHandler: checkAuthMiddleware.execute,
      handler: listController.findLists,
      schema: findListSchema
    })

    fastify.route({
      url: "/lists/finish",
      method: "patch",
      preHandler: checkAuthMiddleware.execute,
      handler: listController.finishLists,
      schema: finishListSchema
    })
}
