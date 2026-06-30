// server/models/task.js
const tasks = [];

module.exports = {
  // GET all tasks
  getAll: async () => {
    return Promise.resolve(tasks);
  },

  // CREATE a new task
  create: async (task) => {
    return Promise.resolve().then(() => {
      task.id = Date.now().toString();
      tasks.push(task);
      return task;
    });
  },

  // UPDATE task by ID
  update: async (id, updates) => {
    return Promise.resolve().then(() => {
      const task = tasks.find(t => t.id === id);
      if (!task) throw new Error("Task not found");
      Object.assign(task, updates);
      return task;
    });
  },

  // DELETE task by ID
  delete: async (id) => {
    return Promise.resolve().then(() => {
      const index = tasks.findIndex(t => t.id === id);
      if (index === -1) throw new Error("Task not found");
      tasks.splice(index, 1);
      return null;
    });
  }
};
