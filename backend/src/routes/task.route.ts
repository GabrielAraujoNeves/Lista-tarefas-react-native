import { FastifyInstance } from "fastify";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";
import { TaskController } from "../controller/task.controller";
import { CreateTaskSchema, deleteTaskSchema, findTaskSchema, finishTaskSchema, upadateTaskSchema } from "./schemas/task.schema";

export const configure = (fastify: FastifyInstance) => {

    const  taskController = new TaskController();

    const checkAuthMiddleware =  new CheckAuthtenticationMiddleware()

    fastify.route({
      url: "/task/create",
      method: "post",
      preHandler: checkAuthMiddleware.execute,
      handler: taskController.createTask,
      schema: CreateTaskSchema
    })

    fastify.route({
      url: "/task/upadate",
      method: "put",
      preHandler: checkAuthMiddleware.execute,
      handler: taskController.updateTask,
      schema: upadateTaskSchema
    })

    fastify.route({
      url: "/task/delete/:taskId", 
      method: "DELETE",  // Método em maiúsculas (convenção)
      preHandler: checkAuthMiddleware.execute,
      handler: taskController.deleteTask,
      schema: deleteTaskSchema
    })

    fastify.route({
      url: "/task/:listId",
      method: "get",
      preHandler: checkAuthMiddleware.execute,
      handler: taskController.findTask,
      schema: findTaskSchema
    })

    fastify.route({
      url: "/task/finish",
      method: "patch",
      preHandler: checkAuthMiddleware.execute,
      handler: taskController.finishTask,
      schema: finishTaskSchema
    })
}
