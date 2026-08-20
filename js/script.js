import { getTasks, createTask, updateTask, deleteTask } from "./tasks.js";

const taskList = document.querySelector(".task-list");

const taskForm = document.querySelector(".task-form");

const formMessage = document.querySelector( ".form-message");

function showLoading() {

  taskList.innerHTML = `
    <p>Loading tasks...</p>
  `;

}

async function loadTasks() {

  showLoading();

  try {

    const tasks =
      await getTasks();

    renderTasks(tasks);

  } catch (error) {

    console.error(
      "Failed to load tasks:",
      error
    );

    showTaskError();

  }

}

function showTaskError() {

  taskList.innerHTML = `
    <p>
      Unable to load tasks.
      Please try again.
    </p>
  `;

}

function renderTasks(tasks) {
  taskList.innerHTML = "";

  if (tasks.length === 0) {

    taskList.innerHTML = `
      <p>
        No tasks yet. Create your first task.
      </p>
    `;

    return;
  }

  tasks.forEach((task) => {
    const taskCard = document.createElement("article");

    taskCard.className = "task-card";

    taskCard.innerHTML = `
  <span class="task-status ${task.completed ? "completed" : ""}">
    ${task.completed ? "Completed" : "Pending"}
  </span>

  <h3>${task.title}</h3>

  <p>
    ${task.description || ""}
  </p>

  ${task.dueDate ? `<p>Due: ${task.dueDate}</p>` : ""}

  <div class="task-actions">

    <button
      type="button"
      data-action="toggle"
      data-task-id="${task.id}"
    >
      ${task.completed ? "Undo" : "Complete"}
    </button>

    <button
      type="button"
      data-action="delete"
      data-task-id="${task.id}"
    >
      Delete
    </button>

  </div>
`;

    taskList.appendChild(taskCard);
  });
}

async function handleCreateTask(event) {

  event.preventDefault();


  formMessage.textContent =
    "Creating task...";


  const formData =
    new FormData(taskForm);


  const taskData = {

    title:
      formData.get("title"),

    description:
      formData.get("description"),

    dueDate:
      formData.get("dueDate") || undefined

  };


  try {

    await createTask(taskData);

    taskForm.reset();

    formMessage.textContent =
      "Task created successfully.";

    await loadTasks();

  } catch (error) {

    console.error(error);

    formMessage.textContent =
      error.message;

  }

}

async function handleTaskClick(event) {
  const button = event.target.closest("button[data-task-id]");

  if (!button) {
    return;
  }

  const taskId = button.dataset.taskId;

  const action = button.dataset.action;

  try {
    if (action === "toggle") {
      const isCompleted = button.textContent.trim() === "Undo";

      await updateTask(taskId, {
        completed: !isCompleted,
      });
    }

    if (action === "delete") {
      const confirmed = window.confirm("Delete this task?");

      if (!confirmed) {
        return;
      }

      await deleteTask(taskId);
    }

    await loadTasks();
  } catch (error) {
    console.error("Task action failed:", error);
  }
}

taskForm.addEventListener("submit", handleCreateTask);

taskList.addEventListener("click", handleTaskClick);

loadTasks();


