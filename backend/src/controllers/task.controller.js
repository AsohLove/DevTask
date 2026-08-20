import {
  getAllTasks,
  getTaskById,
  createNewTask,
  deleteExistingTask,
  updateExistingTask
} from "../services/task.service.js";


export async function getTasks(
  request,
  response,
  next
) {

  try {

    const tasks = await getAllTasks();

    response.json(tasks);

  } catch (error) {

    next(error);

  }

}


export async function getTask(
  request,
  response,
  next
) {

  try {

    const { id } = request.params;

    const task = await getTaskById(id);

    response.json(task);

  } catch (error) {

    next(error);

  }

}


export async function createTask(
  request,
  response,
  next
) {

  try {

    const task = await createNewTask(
      request.body
    );

    response
      .status(201)
      .json(task);

  } catch (error) {

    next(error);

  }

}

export async function updateTask(
  request,
  response,
  next
) {

  try {

    const { id } =
      request.params;

    const task =
      await updateExistingTask(
        id,
        request.body
      );

    response.json(task);

  } catch (error) {

    next(error);

  }

}

export async function removeTask(
  request,
  response,
  next
) {

  try {

    const { id } =
      request.params;

    await deleteExistingTask(id);

    response.status(204).send();

  } catch (error) {

    next(error);

  }

}