import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(3).max(255),

  description: z.string().trim().optional(),

  dueDate: z.string().date().optional(),

  priority: z.enum(["low", "medium", "high"]).default("medium")
});

export const updateTaskSchema = z.object({
    title: z.string().trim().min(3).max(255).optional(),

    description: z.string().trim().optional(),

    dueDate: z.string().date().optional(),

    completed: z.boolean().optional(),

    priority: z.enum(["low", "medium", "high"]).optional()
  }).strict();
