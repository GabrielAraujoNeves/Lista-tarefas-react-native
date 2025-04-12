import { FastifyReply, FastifyRequest } from "fastify";
import ListLogic from "../logic/list.logic";
import { CreateListParams, FinishListParams, UpdateListParams } from "../repositories/interfaces/ListRepository.interface";

export default class ListController {
    private readonly listLogic: ListLogic;

    constructor() {
        this.listLogic = new ListLogic();
    }

     findLists = async(
        req: FastifyRequest<{ Params: { userId: number } }>,
        reply: FastifyReply
    ) =>  {
        const userId = Number(req.params.userId);
        const lists = await this.listLogic.findLists(userId);
        
        reply.send(lists);
    }

       updateLists = async (
        req: FastifyRequest<{ Body: UpdateListParams}>,
        reply: FastifyReply
    ) => {
        const updateParams = req.body;
        const updateList = await this.listLogic.updateList(updateParams);
        
        reply.send(updateList);
    }
    
    deleteLists = async(
        req: FastifyRequest<{ Params: { listId: number } }>,
        reply: FastifyReply
    ) =>  {
        const listeId = Number(req.params.listId);
         await this.listLogic.deleteList(listeId);
        
        reply.send({
            message: "Lista deletada com sucesso"
        });
    }
    

    createLists = async (
        req: FastifyRequest<{ Body: CreateListParams }>,
        reply: FastifyReply
    ) => {
        const createParams  = req.body;
        const listCreate = await this.listLogic.createList(createParams);
        
        reply.send(listCreate);
    }


    finishLists = async (
        req: FastifyRequest<{ Body: FinishListParams }>,
        reply: FastifyReply
    ) => {
        const finishParams  = req.body;
        await this.listLogic.finishList(finishParams);
        
        reply.send({
            message: "Lista finalizada com sucesso!"
        });
    }
}