// server/controllers/commentController.js
const Comment = require("../models/comment");

exports.getAllComments = (req, res, next) => {
  try {
    res.json({ success: true, data: Comment.getAll() });
  } catch (err) { next(err); }
};

exports.addComment = (req, res, next) => {
  try {
    const newComment = Comment.create(req.body);
    res.status(201).json({ success: true, data: newComment });
  } catch (err) { next(err); }
};

exports.updateComment = (req, res, next) => {
  try {
    const updated = Comment.update(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
};

exports.deleteComment = (req, res, next) => {
  try {
    Comment.delete(req.params.id);
    res.status(204).end();
  } catch (err) { next(err); }
};