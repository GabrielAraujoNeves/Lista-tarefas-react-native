import { FastifySchema } from "fastify";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const CreateTaskSchema: FastifySchema = {
    body: zodToJsonSchema(z.object({
        listId: z.number().min(1),
        label: z.string(),
    }))
}

export const upadateTaskSchema: FastifySchema = {
    body: zodToJsonSchema(z.object({
        id: z.number().min(1),
        label: z.string(),
    }))
}

export const deleteTaskSchema: FastifySchema = {
    params: zodToJsonSchema(z.object({
       taskId: z.number().min(1),
    }))
}


export const findTaskSchema: FastifySchema = {
    params: zodToJsonSchema(z.object({
       listId: z.number().min(1),
    }))
}

export const finishTaskSchema: FastifySchema = {
    body: zodToJsonSchema(z.object({
        id: z.number().min(1),
        finishedAt: z.date().nullable(),
    }))
}