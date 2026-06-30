// server/models/comment.js
const comments = [];

module.exports = {
  // GET all comments
  getAll: async () => {
    return Promise.resolve(comments);
  },

  // CREATE a new comment
  create: async (comment) => {
    return Promise.resolve().then(() => {
      comment.id = Date.now().toString();
      comments.push(comment);
      return comment;
    });
  },

  // UPDATE comment by ID
  update: async (id, updates) => {
    return Promise.resolve().then(() => {
      const comment = comments.find(c => c.id === id);
      if (!comment) throw new Error("Comment not found");
      Object.assign(comment, updates);
      return comment;
    });
  },

  // DELETE comment by ID
  delete: async (id) => {
    return Promise.resolve().then(() => {
      const index = comments.findIndex(c => c.id === id);
      if (index === -1) throw new Error("Comment not found");
      comments.splice(index, 1);
      return null;
    });
  }
};
