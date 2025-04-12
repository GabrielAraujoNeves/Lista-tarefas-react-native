import { FastifyReply, FastifyRequest } from "fastify";
import { TaskLogic } from "../logic/task.logic";
import {
  CreateTaskParams,
  FinishTaskParams,
  UpdateTaskParams
} from "../repositories/interfaces/TaskRepository.interface";

// Tipagens para os parâmetros das requisições
interface RequestCreateParams {
  Body: CreateTaskParams;
}

interface RequestFindTaskParams {
  Params: { listId: number };
}

interface RequestDeleteTaskParams {
  Params: { taskId: number };
}

interface RequestUpdateTaskParams {
  Body: UpdateTaskParams;
}

interface RequestFinishTaskParams {
  Body: FinishTaskParams;
}

export class TaskController {
  private taskLogic: TaskLogic;

  constructor() {
    this.taskLogic = new TaskLogic();
  }

  createTask = async (
    req: FastifyRequest<RequestCreateParams>,
    reply: FastifyReply
  ) => {
    const taskData = req.body;
    const task = await this.taskLogic.createTask(taskData);
    reply.send(task);
  };

  findTask = async (
    req: FastifyRequest<RequestFindTaskParams>,
    reply: FastifyReply
  ) => {
    const tasks = await this.taskLogic.findTasks(req.params.listId);
    reply.send(tasks);
  };

  deleteTask = async (
    req: FastifyRequest<RequestDeleteTaskParams>,
    reply: FastifyReply
  ) => {
    await this.taskLogic.deleteTask(req.params.taskId);
    reply.send("Task apagada com sucesso!!");
  };

  updateTask = async (
    req: FastifyRequest<RequestUpdateTaskParams>,
    reply: FastifyReply
  ) => {
    await this.taskLogic.updateTask(req.body);
    reply.send("Task atualizada com sucesso!!");
  };

  finishTask = async (
    req: FastifyRequest<RequestFinishTaskParams>,
    reply: FastifyReply
  ) => {
    await this.taskLogic.finishTask(req.body);
    reply.send("Task finalizada com sucesso!!");
  };
}