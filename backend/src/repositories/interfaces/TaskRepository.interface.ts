import { Task } from "../../database/typeorm/entity/Task";

 export interface CreateTaskParams {
    listId: number;
    label: string;
}

export interface UpdateTaskParams {
    id:  number;
    label: string;
}

export interface FinishTaskParams{
    id: number;
    finishedAt: Date | null
}

export interface TaskRepositoryInterface {
    findTask(listId: number): Promise<Task[]>;
    createTask(params:  CreateTaskParams): Promise<Task>
    deleteTask(id: number): Promise<void>
    updateTask(params: UpdateTaskParams): Promise<void>
    finishTask(params: FinishTaskParams): Promise<void>
}