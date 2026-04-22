// server/controllers/projectController.js
const Project = require("../models/project");

exports.getAllProjects = (req, res, next) => {
  try {
    res.json({ success: true, data: Project.getAll() });
  } catch (err) {
    next(err);
  }
};

exports.createProject = (req, res, next) => {
  try {
    const newProject = Project.create(req.body);
    res.status(201).json({ success: true, data: newProject });
  } catch (err) {
    next(err);
  }
};

exports.updateProject = (req, res, next) => {
  try {
    const updated = Project.update(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = (req, res, next) => {
  try {
    Project.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};