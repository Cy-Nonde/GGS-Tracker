// server/models/project.js
const projects = [];

module.exports = {
  getAll: () => projects,
  create: (project) => {
    project.id = Date.now().toString();
    projects.push(project);
    return project;
  },
  update: (id, updates) => {
    const project = projects.find(p => p.id === id);
    if (!project) throw new Error("Project not found");
    Object.assign(project, updates);
    return project;
  },
  delete: (id) => {
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Project not found");
    projects.splice(index, 1);
  }
};