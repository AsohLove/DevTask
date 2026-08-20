import {
  createTask,
  deleteTask,
  toggleTask
} from "./tasks.js";


// ========================================
// Application State
// ========================================

let tasks = [];


// ========================================
// DOM Elements
// ========================================

const taskList =
  document.querySelector(".task-list");

const taskForm =
  document.querySelector(".task-form");


// ========================================
// Local Storage
// ========================================

const STORAGE_KEY = "devtask_tasks";


function saveTasks() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks)
  );
}


function loadTasks() {
  const storedTasks =
    localStorage.getItem(STORAGE_KEY);

  if (!storedTasks) {
    return;
  }

  try {

    tasks = JSON.parse(storedTasks);

  } catch (error) {

    console.error(
      "Failed to load tasks:",
      error
    );

    tasks = [];
  }
}


// ========================================
// Render Tasks
// ========================================

function renderTasks() {

  taskList.innerHTML = "";


  // Empty state

  if (tasks.length === 0) {

    const emptyState =
      document.createElement("p");

    emptyState.classList.add(
      "empty-state"
    );

    emptyState.textContent =
      "No tasks yet. Create your first task.";

    taskList.append(emptyState);

    return;
  }


  // Render every task

  tasks.forEach(task => {

    const article =
      document.createElement("article");

    article.classList.add("task-card");

    article.dataset.taskId = task.id;


    if (task.completed) {

      article.classList.add("completed");

    }


    const status =
      document.createElement("span");

    status.classList.add("task-status");

    if (task.completed) {

      status.classList.add("completed");

    }

    status.textContent =
      task.completed
        ? "Completed"
        : "Pending";


    const title =
      document.createElement("h3");

    title.textContent = task.title;


    const description =
      document.createElement("p");

    description.textContent =
      task.description ||
      "No description provided.";


    const completeButton =
      document.createElement("button");

    completeButton.type = "button";

    completeButton.classList.add(
      "complete-button"
    );

    completeButton.textContent =
      task.completed
        ? "Undo"
        : "Complete";


    const deleteButton =
      document.createElement("button");

    deleteButton.type = "button";

    deleteButton.classList.add(
      "delete-button"
    );

    deleteButton.textContent =
      "Delete";


    article.append(
      status,
      title,
      description,
      completeButton,
      deleteButton
    );


    taskList.append(article);

  });
}


// ========================================
// Create Task
// ========================================

taskForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    const formData =
      new FormData(taskForm);


    const title =
      formData.get("title").trim();

    const description =
      formData.get("description").trim();

    const dueDate =
      formData.get("dueDate");


    const task =
      createTask(
        title,
        description,
        dueDate
      );


    tasks.push(task);


    saveTasks();

    renderTasks();

    taskForm.reset();

  }
);


// ========================================
// Task Actions
// ========================================

taskList.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest("button");


    if (!button) {
      return;
    }


    const taskCard =
      button.closest(".task-card");


    if (!taskCard) {
      return;
    }


    const taskId =
      taskCard.dataset.taskId;


    // Complete / Undo

    if (
      button.classList.contains(
        "complete-button"
      )
    ) {

      tasks =
        toggleTask(
          tasks,
          taskId
        );


      saveTasks();

      renderTasks();

      return;
    }


    // Delete

    if (
      button.classList.contains(
        "delete-button"
      )
    ) {

      tasks =
        deleteTask(
          tasks,
          taskId
        );


      saveTasks();

      renderTasks();

    }

  }
);


// ========================================
// Application Initialization
// ========================================

loadTasks();

renderTasks();