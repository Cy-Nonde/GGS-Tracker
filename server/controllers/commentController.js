// server/controllers/commentController.js
const Comment = require("../models/comment");

// GET all comments
exports.getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.getAll().then(data => data);
    res.json({ success: true, count: comments.length, data: comments });
  } catch (err) {
    next(err);
  }
};

// ADD a new comment
exports.addComment = async (req, res, next) => {
  try {
    const newComment = await Comment.create(req.body).then(data => data);
    res.status(201).json({ success: true, data: newComment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// UPDATE comment by ID
exports.updateComment = async (req, res, next) => {
  try {
    const updated = await Comment.update(req.params.id, req.body).then(data => data);
    res.json({ success: true, data: updated });
  } catch (err) {
    if (err.message.includes("not found")) {
      res.status(404).json({ success: false, error: err.message });
    } else {
      next(err);
    }
  }
};

// DELETE comment by ID
exports.deleteComment = async (req, res, next) => {
  try {
    await Comment.delete(req.params.id).then(() => null);
    res.status(204).end();
  } catch (err) {
    if (err.message.includes("not found")) {
      res.status(404).json({ success: false, error: err.message });
    } else {
      next(err);
    }
  }
};
