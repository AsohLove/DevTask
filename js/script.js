import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "./tasks.js";


const taskList =
  document.querySelector(".task-list");

const taskForm =
  document.querySelector(".task-form");


async function loadTasks() {

  try {

    const tasks =
      await getTasks();

    renderTasks(tasks);

  } catch (error) {

    console.error(
      "Failed to load tasks:",
      error
    );

  }

}


function renderTasks(tasks) {

  taskList.innerHTML = "";


  tasks.forEach(task => {

    const taskCard =
      document.createElement("article");

    taskCard.className =
      "task-card";


    taskCard.innerHTML = `
      <span class="task-status ${
        task.completed
          ? "completed"
          : ""
      }">
        ${
          task.completed
            ? "Completed"
            : "Pending"
        }
      </span>

      <h3>${task.title}</h3>

      <p>
        ${task.description || ""}
      </p>

      <button
        type="button"
        data-task-id="${task.id}"
      >
        ${
          task.completed
            ? "Undo"
            : "Complete"
        }
      </button>
    `;


    taskList.appendChild(taskCard);

  });

}


async function handleCreateTask(event) {

  event.preventDefault();


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

    await loadTasks();

  } catch (error) {

    console.error(
      "Failed to create task:",
      error
    );

  }

}


async function handleTaskClick(event) {

  const button =
    event.target.closest(
      "[data-task-id]"
    );


  if (!button) {
    return;
  }


  const taskId =
    button.dataset.taskId;


  const isCompleted =
    button.textContent.trim()
      === "Undo";


  try {

    if (isCompleted) {

      await updateTask(
        taskId,
        {
          completed: false
        }
      );

    } else {

      await updateTask(
        taskId,
        {
          completed: true
        }
      );

    }


    await loadTasks();

  } catch (error) {

    console.error(
      "Failed to update task:",
      error
    );

  }

}


taskForm.addEventListener(
  "submit",
  handleCreateTask
);


taskList.addEventListener(
  "click",
  handleTaskClick
);


loadTasks();