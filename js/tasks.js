const API_URL = "http://localhost:3000/api/tasks";


export async function getTasks() {

  const response = await fetch(API_URL);


  if (!response.ok) {

    throw new Error(
      "Failed to fetch tasks"
    );

  }


  return response.json();

}


export async function createTask(taskData) {

  const response = await fetch(
    API_URL,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(taskData)
    }
  );


  if (!response.ok) {

    const error =
      await response.json();

    throw new Error(
      error.error ||
      "Failed to create task"
    );

  }


  return response.json();

}


export async function updateTask(
  id,
  updates
) {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(updates)
    }
  );


  if (!response.ok) {

    const error =
      await response.json();

    throw new Error(
      error.error ||
      "Failed to update task"
    );

  }


  return response.json();

}


export async function deleteTask(id) {

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE"
    }
  );


  if (!response.ok) {

    const error =
      await response.json();

    throw new Error(
      error.error ||
      "Failed to delete task"
    );

  }

}