// server/controllers/taskController.js
const Task = require("../models/task");

exports.getAllTasks = (req, res, next) => {
  try {
    res.json({ success: true, data: Task.getAll() });
  } catch (err) {
    next(err);
  }
};

exports.createTask = (req, res, next) => {
  try {
    const newTask = Task.create(req.body);
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = (req, res, next) => {
  try {
    const updated = Task.update(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = (req, res, next) => {
  try {
    Task.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};