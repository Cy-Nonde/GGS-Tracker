// server/routes/comments.js
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const auth = require("../middleware/auth");

// GET all comments
router.get("/", async (req, res, next) => {
  try {
    await commentController.getAllComments(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

// ADD a new comment
router.post("/", auth, async (req, res, next) => {
  try {
    await commentController.addComment(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

// UPDATE comment by ID
router.put("/:id", auth, async (req, res, next) => {
  try {
    await commentController.updateComment(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

// DELETE comment by ID
router.delete("/:id", auth, async (req, res, next) => {
  try {
    await commentController.deleteComment(req, res, next).then(() => null);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
