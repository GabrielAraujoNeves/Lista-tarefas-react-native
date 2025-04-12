import { FastifySchema } from "fastify";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const CreateListSchema: FastifySchema = {
    body: zodToJsonSchema(z.object({
        userId: z.number().min(1),
        label: z.string(),
    }))
}

export const upadateListSchema: FastifySchema = {
    body: zodToJsonSchema(z.object({
        id: z.number().min(1),
        label: z.string(),
    }))
}

export const deleteListSchema: FastifySchema = {
    params: zodToJsonSchema(z.object({
       listId: z.number().min(1),
    }))
}


export const findListSchema: FastifySchema = {
    params: zodToJsonSchema(z.object({
       userId: z.number().min(1),
    }))
}

export const finishListSchema: FastifySchema = {
    body: zodToJsonSchema(z.object({
        id: z.number().min(1),
        finishedAt: z.date().nullable(),
    }))
}