// server/models/comment.js
const comments = [];

module.exports = {
  getAll: () => comments,
  create: (comment) => {
    comment.id = Date.now().toString();
    comments.push(comment);
    return comment;
  },
  update: (id, updates) => {
    const comment = comments.find(c => c.id === id);
    if (!comment) throw new Error("Comment not found");
    Object.assign(comment, updates);
    return comment;
  },
  delete: (id) => {
    const index = comments.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Comment not found");
    comments.splice(index, 1);
  }
};