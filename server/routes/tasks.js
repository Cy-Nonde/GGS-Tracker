// server/routes/tasks.js
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// GET all tasks
router.get("/", async (req, res, next) => {
  try {
    await taskController.getAllTasks(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

// CREATE a new task
router.post("/", async (req, res, next) => {
  try {
    await taskController.createTask(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

// UPDATE task by ID
router.put("/:id", async (req, res, next) => {
  try {
    await taskController.updateTask(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

// DELETE task by ID
router.delete("/:id", async (req, res, next) => {
  try {
    await taskController.deleteTask(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
