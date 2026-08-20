import express from "express";

import taskRoutes from "./routes/task.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();


// ========================================
// Middleware
// ========================================

app.use(express.json());


// ========================================
// Health Check
// ========================================

app.get("/health", (request, response) => {

  response.json({
    status: "ok",
    service: "devtask-api"
  });

});


app.get("/api/tasks", taskRoutes);

app.post("/api/tasks", (request, response) => {

  const task = request.body;

  response.status(201).json({
    message: "Task created",
    task
  });

});

app.use(errorHandler)


// ========================================
// Export
// ========================================

export default app;