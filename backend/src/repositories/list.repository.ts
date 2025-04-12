import { Repository } from "typeorm";
import { List } from "../database/typeorm/entity/List";
import { AppDataSource } from "../database/typeorm/data-source";
import {
  CreateListParams,
  FinishListParams,
  ListRepositoryInterface,
  UpdateListParams,
} from "./interfaces/ListRepository.interface";

export class ListRepository implements ListRepositoryInterface {
  private repository: Repository<List>;

  constructor() {
    this.repository = AppDataSource.getRepository(List);
  }

  async findLists(userId: number): Promise<List[]> {
    try {
      const lists = await this.repository.find({
         where: { userId }, 
         relations: ['tasks'],
        });
      return lists;
    } catch (error) {
      throw new Error("Falha ao buscar listas");
    }
  }

  async updateList({ id, label }: UpdateListParams): Promise<void> {
    try {
      await this.repository.update({ id }, { label });
    } catch (error) {
      throw new Error("Falha ao atualizar lista");
    }
  }

  async deleteList(id: number): Promise<void> {
    try {
      await this.repository.softDelete({ id });
    } catch (error) {
      throw new Error("Falha ao deletar lista");
    }
  }

  async createList({ label, userId }: CreateListParams): Promise<List> {
    try {
        const list = await this.repository.save({
            label,
            userId,
            finishedAt: null,
            createdAt: new Date() // Adicione esta linha
        });
        return list;
    } catch (error) {
        console.error("Erro detalhado:", error);
        throw new Error(`Falha ao criar lista: ${error.message}`);
    }
}

  async finishList({ id, finishedAt }: FinishListParams): Promise<void> {
    try {
      await this.repository.update({ id }, { finishedAt });
    } catch (error) {
      throw new Error("Falha ao atualiza lista");
    }
  }
}
