// server/routes/comments.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

router.get("/", commentController.getAllComments);
router.post("/", auth, commentController.addComment);
router.put("/:id", auth, commentController.updateComment);
router.delete("/:id", auth, commentController.deleteComment);

module.exports = router;
