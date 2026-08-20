/**
 * Create a new task.
 */
export function createTask(
  title,
  description = "",
  dueDate = ""
) {
  return {
    id: crypto.randomUUID(),

    title,

    description,

    dueDate,

    completed: false,

    createdAt: new Date().toISOString()
  };
}


/**
 * Delete a task.
 *
 * Returns a new array without the
 * specified task.
 */
export function deleteTask(tasks, taskId) {
  return tasks.filter(
    task => task.id !== taskId
  );
}


/**
 * Toggle the completion state of a task.
 *
 * Pending -> Completed
 * Completed -> Pending
 */
export function toggleTask(tasks, taskId) {
  return tasks.map(task => {

    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,

      completed: !task.completed
    };
  });
}


/**
 * Return only active tasks.
 */
export function getActiveTasks(tasks) {
  return tasks.filter(
    task => !task.completed
  );
}


/**
 * Return only completed tasks.
 */
export function getCompletedTasks(tasks) {
  return tasks.filter(
    task => task.completed
  );
}