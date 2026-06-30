// server/server.js
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");
const collaboratorRoutes = require("./routes/collaborators");
const commentRoutes = require("./routes/comments");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));


// Health Check Endpoint
app.get("/api/health", async (req, res, next) => {
  try {
    await Promise.resolve().then(() => {
      res.json({
        success: true,
        message: "Server is running",
        timestamp: new Date()
      });
    });
  } catch (err) {
    next(err);
  }
});

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/collaborators", collaboratorRoutes);
app.use("/api/comments", commentRoutes);

// Global Error Handler
app.use(errorHandler);

// Server Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  await Promise.resolve().then(() => {
    console.log(`
======================================================        
    GGS TRACKER 
    Server Running at http://localhost:${PORT}
======================================================        
    `);
    });
});
