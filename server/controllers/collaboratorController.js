// server/controllers/collaboratorController.js
const Collaborator = require("../models/collaborator");

exports.getAllCollaborators = (req, res, next) => {
  try {
    res.json({ success: true, data: Collaborator.getAll() });
  } catch (err) { next(err); }
};

exports.addCollaborator = (req, res, next) => {
  try {
    const newCollab = Collaborator.create(req.body);
    res.status(201).json({ success: true, data: newCollab });
  } catch (err) { next(err); }
};

exports.updateCollaborator = (req, res, next) => {
  try {
    const updated = Collaborator.update(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

exports.removeCollaborator = (req, res, next) => {
  try {
    Collaborator.delete(req.params.id);
    res.status(204).end();
  } catch (err) { next(err); }
};