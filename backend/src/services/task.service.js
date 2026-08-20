import {
  findAllTasks,
  findTaskById,
  createTask,
  deleteTask,
  updateTask
} from "../repositories/task.repository.js";

import { mapTask } from "../mappers/task.mapper.js";

export async function getAllTasks() {

  const tasks = await findAllTasks();

  return tasks.map(mapTask);

}


export async function getTaskById(id) {

  const task = await findTaskById(id);

  if (!task) {

    const error = new Error("Task not found");

    error.statusCode = 404;

    throw error;
  }

  return mapTask(task);

}


export async function createNewTask(data) {

  return createTask(data);

}

export async function updateExistingTask(
  id,
  data
) {

  const task =
    await updateTask(id, data);


  if (!task) {

    const error =
      new Error("Task not found");

    error.statusCode = 404;

    throw error;

  }


  return mapTask(task);
}

export async function deleteExistingTask(id) {

  const task =
    await deleteTask(id);


  if (!task) {

    const error =
      new Error("Task not found");

    error.statusCode = 404;

    throw error;

  }

}