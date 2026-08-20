import express from "express";

import { createTaskSchema, updateTaskSchema } from "../validators/task.validator.js";

import { idSchema } from "../validators/id.validator.js";

import { validate, validateParams } from "../middleware/validate.middleware.js";

import { authenticate } from "../middleware/auth.middleware.js";

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
  authenticate,
  getTasks
);


router.get(
  "/:id",
  authenticate,
  validateParams(idSchema),
  getTask
);


router.post(
  "/",
  authenticate,
  validate(createTaskSchema),
  createTask
);


router.patch(
  "/:id",
  authenticate,
  validateParams(idSchema),
  validate(updateTaskSchema),
  updateTask
);

router.delete(
  "/:id",
  authenticate,
  validateParams(idSchema),
  removeTask
);

export default router;