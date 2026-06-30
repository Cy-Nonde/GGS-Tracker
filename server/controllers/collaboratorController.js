// server/controllers/collaboratorController.js
const Collaborator = require("../models/collaborator");

// GET all collaborators
exports.getAllCollaborators = async (req, res, next) => {
  try {
    const collaborators = await Collaborator.getAll().then(data => data);
    res.json({ success: true, count: collaborators.length, data: collaborators });
  } catch (err) {
    next(err);
  }
};

// ADD a new collaborator
exports.addCollaborator = async (req, res, next) => {
  try {
    const newCollab = await Collaborator.create(req.body).then(data => data);
    res.status(201).json({ success: true, data: newCollab });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// UPDATE collaborator by ID
exports.updateCollaborator = async (req, res, next) => {
  try {
    const updated = await Collaborator.update(req.params.id, req.body).then(data => data);
    res.json({ success: true, data: updated });
  } catch (err) {
    if (err.message.includes("not found")) {
      res.status(404).json({ success: false, error: err.message });
    } else {
      next(err);
    }
  }
};

// DELETE collaborator by ID
exports.removeCollaborator = async (req, res, next) => {
  try {
    await Collaborator.delete(req.params.id).then(() => null);
    res.status(204).end();
  } catch (err) {
    if (err.message.includes("not found")) {
      res.status(404).json({ success: false, error: err.message });
    } else {
      next(err);
    }
  }
};
