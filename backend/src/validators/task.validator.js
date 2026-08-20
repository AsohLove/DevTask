import { z } from "zod";


export const createTaskSchema = z.object({

  title: z
    .string()
    .trim()
    .min(3)
    .max(255),

  description: z
    .string()
    .trim()
    .optional(),

  dueDate: z
    .string()
    .date()
    .optional()

});