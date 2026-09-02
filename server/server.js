// server/server.js
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

// Core project routes
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");
const collaboratorRoutes = require("./routes/collaborators");
const commentRoutes = require("./routes/comments");
const historyRoutes = require('./routes/history');
const recordRoutes = require('./routes/records');

// AI chatbot + auth routes 
const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const express = require('express');
const app = express();
const historyRoutes = require('./routes/history');

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/collaborators", collaboratorRoutes);
app.use("/api/comments", commentRoutes);
app.use('/', historyRoutes);
app.use('/', recordRoutes);

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