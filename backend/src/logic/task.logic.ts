import { Task } from "../database/typeorm/entity/Task";
import { CreateTaskParams, FinishTaskParams, UpdateTaskParams } from "../repositories/interfaces/TaskRepository.interface";
import { TaskRepository } from "../repositories/task.repository";

export class TaskLogic{
    private taskRespository: TaskRepository;

    constructor () {
        this.taskRespository = new TaskRepository();
    }

    async findTasks(listId: number): Promise<Task[]> {
        const tasks = await this.taskRespository.findTask(listId);
        return tasks;
    }

    async updateTask(task: UpdateTaskParams): Promise<void>{
        await this.taskRespository.updateTask(task);
    }

    async deleteTask(id: number): Promise<void> {
        await this.taskRespository.deleteTask(id);
    }

    async finishTask(taskToFinish: FinishTaskParams): Promise<void>{
        await this.taskRespository.finishTask(taskToFinish);;
    }

    async createTask(task: CreateTaskParams): Promise<Task> {
        const taskCreatet = await this.taskRespository.createTask(task);
        return taskCreatet;
    }
}