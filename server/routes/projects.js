// server/routes/projects.js
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// GET all projects
router.get("/", async (req, res, next) => {
  try {
    await projectController.getAllProjects(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

// CREATE a new project
router.post("/", async (req, res, next) => {
  try {
    await projectController.createProject(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

// UPDATE project by ID
router.put("/:id", async (req, res, next) => {
  try {
    await projectController.updateProject(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

// DELETE project by ID
router.delete("/:id", async (req, res, next) => {
  try {
    await projectController.deleteProject(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
