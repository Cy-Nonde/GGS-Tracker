// server/models/project.js
const projects = [];

module.exports = {
  // GET all projects
  getAll: async () => {
    return Promise.resolve(projects);
  },

  // CREATE a new project
  create: async (project) => {
    return Promise.resolve().then(() => {
      project.id = Date.now().toString();
      projects.push(project);
      return project;
    });
  },

  // UPDATE project by ID
  update: async (id, updates) => {
    return Promise.resolve().then(() => {
      const project = projects.find(p => p.id === id);
      if (!project) throw new Error("Project not found");
      Object.assign(project, updates);
      return project;
    });
  },

  // DELETE project by ID
  delete: async (id) => {
    return Promise.resolve().then(() => {
      const index = projects.findIndex(p => p.id === id);
      if (index === -1) throw new Error("Project not found");
      projects.splice(index, 1);
      return null;
    });
  }
};
