// server/routes/collaborators.js
const express = require("express");
const router = express.Router();
const collaboratorController = require("../controllers/collaboratorController");
const auth = require("../middleware/auth");

// GET all collaborators
router.get("/", async (req, res, next) => {
  try {
    await collaboratorController.getAllCollaborators(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

// ADD a new collaborator
router.post("/", auth, async (req, res, next) => {
  try {
    await collaboratorController.addCollaborator(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

// UPDATE collaborator by ID
router.put("/:id", auth, async (req, res, next) => {
  try {
    await collaboratorController.updateCollaborator(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

// DELETE collaborator by ID
router.delete("/:id", auth, async (req, res, next) => {
  try {
    await collaboratorController.removeCollaborator(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
