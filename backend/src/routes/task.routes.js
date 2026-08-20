import express from "express";

import { createTaskSchema } from "../validators/task.validator.js";

import { validate } from "../middleware/validate.middleware.js";

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
  getTask
);


router.post(
  "/",
  validate(createTaskSchema),
  createTask
);


router.patch(
  "/:id",
  updateTask
);

router.delete(
  "/:id",
  removeTask
);

export default router;