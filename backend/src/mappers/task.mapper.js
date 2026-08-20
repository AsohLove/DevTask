export function mapTask(task) {

  return {
    id: task.id,

    title: task.title,

    description:
      task.description,

    dueDate:
      task.due_date,

    completed:
      task.completed,

    createdAt:
      task.created_at,

    updatedAt:
      task.updated_at
  };

}