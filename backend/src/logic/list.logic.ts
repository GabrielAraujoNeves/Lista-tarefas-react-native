import { List } from "../database/typeorm/entity/List";
import { CreateListParams, UpdateListParams } from "../repositories/interfaces/ListRepository.interface";
import { FinishTaskParams } from "../repositories/interfaces/TaskRepository.interface";
import { ListRepository } from "../repositories/list.repository";

export default class ListLogic {
    private listRepository: ListRepository;  // Corrigido o nome e adicionado tipo

    constructor() {
        this.listRepository = new ListRepository();
    }

    async findLists(userId: number): Promise<List[]> {  // Corrigido o tipo de retorno
        const lists = await this.listRepository.findLists(userId);
        return lists;
    }

    async updateList(list: UpdateListParams): Promise<void> {
        await this.listRepository.updateList(list);
    }

    async deleteList(id: number): Promise<void> {
        await this.listRepository.deleteList(id);
    }

    async createList(list: CreateListParams): Promise<List> {
        const listCreated = await this.listRepository.createList(list);
        return listCreated
    }

    async finishList(list: FinishTaskParams): Promise<void> {
        await this.listRepository.finishList(list);
    }
}