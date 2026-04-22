// server/models/task.js
const tasks = [];

module.exports = {
  getAll: () => tasks,
  create: (task) => {
    task.id = Date.now().toString();
    tasks.push(task);
    return task;
  },
  update: (id, updates) => {
    const task = tasks.find(t => t.id === id);
    if (!task) throw new Error("Task not found");
    Object.assign(task, updates);
    return task;
  },
  delete: (id) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Task not found");
    tasks.splice(index, 1);
  }
};