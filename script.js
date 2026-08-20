const form = document.querySelector(".task-form");

const taskList = document.querySelector(".task-list");


function createTaskCard(task) {

  const taskCard = document.createElement("article");

  taskCard.classList.add("task-card");


  const taskStatus = document.createElement("span");

  taskStatus.classList.add("task-status");

  taskStatus.textContent = "Pending";


  const taskTitle = document.createElement("h3");

  taskTitle.textContent = task.title;


  const taskDescription = document.createElement("p");

  taskDescription.textContent = task.description;


  const completeButton = document.createElement("button");

  completeButton.type = "button";

  completeButton.textContent = "Complete";


  completeButton.addEventListener("click", () => {

    taskStatus.textContent = "Completed";

    taskStatus.classList.add("completed");

    completeButton.textContent = "Completed";

    completeButton.disabled = true;

  });


  taskCard.append(
    taskStatus,
    taskTitle,
    taskDescription,
    completeButton
  );


  return taskCard;
}


form.addEventListener("submit", (event) => {

  event.preventDefault();


  const formData = new FormData(form);


  const task = {

    title: formData.get("title"),

    description: formData.get("description"),

    dueDate: formData.get("dueDate"),

    completed: false

  };


  if (!task.title || task.title.length < 3) {

    console.log(
      "Task title must contain at least 3 characters"
    );

    return;
  }


  const taskCard = createTaskCard(task);


  taskList.append(taskCard);


  form.reset();

});