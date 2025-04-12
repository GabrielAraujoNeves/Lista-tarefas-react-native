import { Repository } from "typeorm";
import { Task } from "../database/typeorm/entity/Task";
import { AppDataSource } from "../database/typeorm/data-source";
import {
  TaskRepositoryInterface,
  CreateTaskParams,
  UpdateTaskParams,
  FinishTaskParams
} from "./interfaces/TaskRepository.interface";

export class TaskRepository implements TaskRepositoryInterface {
  private repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async findTask(listId: number): Promise<Task[]> {
    try {
      return await this.repository.find({ where: { listId } });
    } catch (error) {
      throw new Error("Erro ao buscar tarefas");
    }
  }

  async createTask({ listId, label }: CreateTaskParams): Promise<Task> {
    try {
      const task = await this.repository.save({
        listId,
        label,
        finishedAt: null
      });
      return task;
    } catch (error) {
      throw new Error("Erro ao criar tarefa");
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await this.repository.softDelete({ id });
    } catch (error) {
      throw new Error("Erro ao deletar tarefa");
    }
  }

 /* async updateTask({ id, label }: UpdateTaskParams): Promise<void> {
    try {
      await this.repository.save({ id }, { label });
    } catch (error) {
      throw new Error("Erro ao atualizar tarefa");
    }
  }*/

    async updateTask({ id, label}: UpdateTaskParams): Promise<void> {
      try {
        await this.repository.save({
          id,
          label,
        });
      } catch (error) {
        throw new Error("Falha ao atualizar task")
      }
    }

  async finishTask({ id, finishedAt }: FinishTaskParams): Promise<void> {
    try {
      await this.repository.update({ id }, { finishedAt });
    } catch (error) {
      throw new Error("Erro ao finalizar tarefa");
    }
  }
}
