// server/models/collaborator.js
const collaborators = [];

module.exports = {
  // GET all collaborators
  getAll: async () => {
    return Promise.resolve(collaborators);
  },

  // CREATE a new collaborator
  create: async (collab) => {
    return Promise.resolve().then(() => {
      collab.id = Date.now().toString();
      collaborators.push(collab);
      return collab;
    });
  },

  // UPDATE collaborator by ID
  update: async (id, updates) => {
    return Promise.resolve().then(() => {
      const collab = collaborators.find(c => c.id === id);
      if (!collab) throw new Error("Collaborator not found");
      Object.assign(collab, updates);
      return collab;
    });
  },

  // DELETE collaborator by ID
  delete: async (id) => {
    return Promise.resolve().then(() => {
      const index = collaborators.findIndex(c => c.id === id);
      if (index === -1) throw new Error("Collaborator not found");
      collaborators.splice(index, 1);
      return null;
    });
  }
};
