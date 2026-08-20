import express from "express";

import { createTaskSchema, updateTaskSchema } from "../validators/task.validator.js";

import { idSchema } from "../validators/id.validator.js";

import { validate, validateParams } from "../middleware/validate.middleware.js";

import {
  getTasks,
  getTask,
  createTask,
  removeTask,
  updateTask
} from "../controllers/task.controller.js";


const router = express.Router();


router.get(
  "/",
  getTasks
);


router.get(
  "/:id",
  validateParams(idSchema),
  getTask
);


router.post(
  "/",
  validate(createTaskSchema),
  createTask
);


router.patch(
  "/:id",
  validateParams(idSchema),
  validate(updateTaskSchema),
  updateTask
);

router.delete(
  "/:id",
  validateParams(idSchema),
  removeTask
);

export default router;