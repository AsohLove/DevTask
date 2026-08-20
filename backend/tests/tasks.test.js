import test, {
  before,
  after,
  beforeEach
} from "node:test";

import assert from "node:assert/strict";

import request from "supertest";

import app from "../src/app.js";

import pool from "../src/db/pool.js";


test("GET /health returns API status", async () => {

  const response =
    await request(app)
      .get("/health");


  assert.equal(
    response.statusCode,
    200
  );


  assert.deepEqual(
    response.body,
    {
      status: "ok",
      service: "devtask-api"
    }
  );

});

test("POST /api/tasks creates a task", async () => {

  const response =
    await request(app)
      .post("/api/tasks")
      .send({
        title: "Learn testing",
        description: "Learn API testing",
        dueDate: "2026-08-30"
      });


  assert.equal(
    response.statusCode,
    201
  );


  assert.equal(
    response.body.title,
    "Learn testing"
  );


  assert.equal(
    response.body.completed,
    false
  );


  assert.ok(
    response.body.id
  );

});

test("POST /api/tasks rejects invalid title", async () => {

  const response =
    await request(app)
      .post("/api/tasks")
      .send({
        title: "Hi"
      });


  assert.equal(
    response.statusCode,
    400
  );


  assert.equal(
    response.body.error,
    "Validation failed"
  );

});

test("GET /api/tasks/:id returns 404 for missing task", async () => {

  const response =
    await request(app)
      .get(
        "/api/tasks/00000000-0000-0000-0000-000000000000"
      );


  assert.equal(
    response.statusCode,
    404
  );

});

test("PATCH /api/tasks/:id updates a task", async () => {

  const createResponse =
    await request(app)
      .post("/api/tasks")
      .send({
        title: "Original task"
      });


  const taskId =
    createResponse.body.id;


  const response =
    await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send({
        completed: true
      });


  assert.equal(
    response.statusCode,
    200
  );


  assert.equal(
    response.body.completed,
    true
  );

});

test("DELETE /api/tasks/:id deletes a task", async () => {

  const createResponse =
    await request(app)
      .post("/api/tasks")
      .send({
        title: "Delete me"
      });


  const taskId =
    createResponse.body.id;


  const deleteResponse =
    await request(app)
      .delete(`/api/tasks/${taskId}`);


  assert.equal(
    deleteResponse.statusCode,
    204
  );

});











after(async () => {

  await pool.end();

});