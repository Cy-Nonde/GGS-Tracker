// server/routes/collaborators.js
const express = require("express");
const router = express.Router();
const collaboratorController = require("../controllers/collaboratorController");
const auth = require("../middleware/auth");

router.get("/", collaboratorController.getAllCollaborators);
router.post("/", auth, collaboratorController.addCollaborator);
router.put("/:id", auth, collaboratorController.updateCollaborator);
router.delete("/:id", auth, collaboratorController.removeCollaborator);

module.exports = router;