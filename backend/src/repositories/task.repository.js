import pool from "../db/pool.js";


export async function findAllTasks() {

  const result = await pool.query(`
    SELECT
      id,
      title,
      description,
      due_date,
      completed,
      created_at,
      updated_at
    FROM tasks
    ORDER BY created_at DESC
  `);

  return result.rows;
}


export async function findTaskById(id) {

  const result = await pool.query(
    `
      SELECT
        id,
        title,
        description,
        due_date,
        completed,
        created_at,
        updated_at
      FROM tasks
      WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] ?? null;
}


export async function createTask({
  title,
  description,
  dueDate
}) {

  const result = await pool.query(
    `
      INSERT INTO tasks (
        title,
        description,
        due_date
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        title,
        description,
        due_date,
        completed,
        created_at,
        updated_at
    `,
    [
      title,
      description ?? null,
      dueDate ?? null
    ]
  );

  return result.rows[0];
}

export async function updateTask(
  id,
  { title, description, dueDate, completed }
) {

  const result = await pool.query(
    `
      UPDATE tasks
      SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        due_date = COALESCE($3, due_date),
        completed = COALESCE($4, completed),
        updated_at = NOW()
      WHERE id = $5
      RETURNING
        id,
        title,
        description,
        due_date,
        completed,
        created_at,
        updated_at
    `,
    [
      title ?? null,
      description ?? null,
      dueDate ?? null,
      completed ?? null,
      id
    ]
  );

  return result.rows[0] ?? null;
}

export async function deleteTask(id) {

  const result = await pool.query(
    `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING id
    `,
    [id]
  );

  return result.rows[0] ?? null;
}