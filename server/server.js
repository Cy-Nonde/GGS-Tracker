// server/server.js
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

// Core project routes
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");
const collaboratorRoutes = require("./routes/collaborators");
const commentRoutes = require("./routes/comments");
const historyRoutes = require('./routes/history');
const recordRoutes = require('./routes/records');
const drugRoutes = require("./routes/drugRoutes");

// AI chatbot + auth routes 
const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/collaborators", collaboratorRoutes);
app.use("/api/comments", commentRoutes);
app.use('/', historyRoutes);
app.use('/', recordRoutes);
app.use("/api", drugRoutes);

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create table on server startup
db.run(`
CREATE TABLE IF NOT EXISTS drug_use (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    drug_name TEXT NOT NULL,
    status TEXT NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);


// AIChatbot + Auth integrations
app.use("/api/chat", chatRoutes);   // uses chatController + aiService
app.use("/api/auth", authRoutes);   // uses authController + userModel

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

// Global Error Handler
app.use(errorHandler);

// Server Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  await Promise.resolve().then(() => {
    console.log(`
======================================================        
    GGS TRACKER + AIChat + Auth
    Server Running at http://localhost:${PORT}
======================================================        
    `);
  });
});