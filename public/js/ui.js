// public/js/ui.js
import { 
  getProjects, getTasks, getCollaborators, getComments 
} from "./api.js";

// --- Projects ---
export async function renderProjects() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  try {
    const { success, data, error } = await getProjects().then(res => res);
    if (!success) {
      app.innerHTML = `<p>Error: ${error}</p>`;
      return;
    }
    data.forEach(p => {
      const div = document.createElement("div");
      div.className = "project-card";
      div.innerHTML = `<h4>${p.name}</h4><p>${p.description || ""}</p>`;
      app.appendChild(div);
    });
  } catch (err) {
    app.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

// --- Tasks ---
export async function renderTasks() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  try {
    const { success, data, error } = await getTasks().then(res => res);
    if (!success) {
      app.innerHTML = `<p>Error: ${error}</p>`;
      return;
    }
    data.forEach(t => {
      const div = document.createElement("div");
      div.className = "task-card";
      div.innerHTML = `<h4>${t.title}</h4><p>Status: ${t.status}</p>`;
      app.appendChild(div);
    });
  } catch (err) {
    app.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

// --- Collaborators ---
export async function renderCollaborators() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  try {
    const { success, data, error } = await getCollaborators().then(res => res);
    if (!success) {
      app.innerHTML = `<p>Error: ${error}</p>`;
      return;
    }
    data.forEach(c => {
      const div = document.createElement("div");
      div.className = "collaborator-card";
      div.innerHTML = `<h4>${c.name}</h4><p>Role: ${c.role}</p>`;
      app.appendChild(div);
    });
  } catch (err) {
    app.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

// --- Comments ---
export async function renderComments() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  try {
    const { success, data, error } = await getComments().then(res => res);
    if (!success) {
      app.innerHTML = `<p>Error: ${error}</p>`;
      return;
    }
    data.forEach(cm => {
      const div = document.createElement("div");
      div.className = "comment-card";
      div.innerHTML = `<p><strong>${cm.author}:</strong> ${cm.text}</p>`;
      app.appendChild(div);
    });
  } catch (err) {
    app.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

// --- Timeline ---
export async function renderTimeline() {
  const app = document.getElementById("app");
  app.innerHTML = "<p>Timeline view coming soon...</p>";
}

// --- AI ---
export function renderMessage(role, text) {
  const chatWindow = document.getElementById("chat-window");
  const bubble = document.createElement("div");

  bubble.className = role === "user" ? "bubble user" : "bubble ai";
  bubble.textContent = text;

  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
