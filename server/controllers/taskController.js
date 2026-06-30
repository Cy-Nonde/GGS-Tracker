// server/controllers/taskController.js
const Task = require("../models/task");

// GET all tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.getAll().then(data => data);
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    next(err);
  }
};

// CREATE a new task
exports.createTask = async (req, res, next) => {
  try {
    const newTask = await Task.create(req.body).then(data => data);
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// UPDATE task by ID
exports.updateTask = async (req, res, next) => {
  try {
    const updated = await Task.update(req.params.id, req.body).then(data => data);
    res.json({ success: true, data: updated });
  } catch (err) {
    if (err.message.includes("not found")) {
      res.status(404).json({ success: false, error: err.message });
    } else {
      next(err);
    }
  }
};

// DELETE task by ID
exports.deleteTask = async (req, res, next) => {
  try {
    await Task.delete(req.params.id).then(() => null);
    res.status(204).end();
  } catch (err) {
    if (err.message.includes("not found")) {
      res.status(404).json({ success: false, error: err.message });
    } else {
      next(err);
    }
  }
};
