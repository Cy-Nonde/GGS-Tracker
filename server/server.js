// server/server.js
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

const errorHandler = require("./middleware/errorHandler");

// Drug routes
const { router: drugRoutes } = require("./routes/drugRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

// Drug routes
app.use("/api", drugRoutes);

// Health Check Endpoint
app.get("/api/health", async (req, res, next) => {
  try {
    await Promise.resolve().then(() => {
      res.json({
        success: true,
        message: "Server is running",
        timestamp: new Date(),
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
