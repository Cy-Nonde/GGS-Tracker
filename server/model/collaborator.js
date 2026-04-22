// server/models/collaborator.js
const collaborators = [];

module.exports = {
  getAll: () => collaborators,
  create: (collab) => {
    collab.id = Date.now().toString();
    collaborators.push(collab);
    return collab;
  },
  update: (id, updates) => {
    const collab = collaborators.find(c => c.id === id);
    if (!collab) throw new Error("Collaborator not found");
    Object.assign(collab, updates);
    return collab;
  },
  delete: (id) => {
    const index = collaborators.findIndex(c => c.id === id);
    if (index === -1) throw new Error("Collaborator not found");
    collaborators.splice(index, 1);
  }
};