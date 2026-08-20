import express from "express";

import cors from "cors"

import taskRoutes from "./routes/task.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors())


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


app.use("/api/tasks", taskRoutes);


app.use(errorHandler)


// ========================================
// Export
// ========================================

export default app;