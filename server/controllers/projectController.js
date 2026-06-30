// server/controllers/projectController.js
const Project = require("../models/project");

// GET all projects
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.getAll().then(data => data);
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
};

// CREATE a new project
exports.createProject = async (req, res, next) => {
  try {
    const newProject = await Project.create(req.body).then(data => data);
    res.status(201).json({ success: true, data: newProject });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// UPDATE project by ID
exports.updateProject = async (req, res, next) => {
  try {
    const updated = await Project.update(req.params.id, req.body).then(data => data);
    res.json({ success: true, data: updated });
  } catch (err) {
    if (err.message.includes("not found")) {
      res.status(404).json({ success: false, error: err.message });
    } else {
      next(err);
    }
  }
};

// DELETE project by ID
exports.deleteProject = async (req, res, next) => {
  try {
    await Project.delete(req.params.id).then(() => null);
    res.status(204).end();
  } catch (err) {
    if (err.message.includes("not found")) {
      res.status(404).json({ success: false, error: err.message });
    } else {
      next(err);
    }
  }
};









