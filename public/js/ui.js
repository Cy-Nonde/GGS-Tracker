// public/js/ui.js
import { getCollaborators, getComments } from "./api.js";

export async function renderCollaborators() {
  const app = document.getElementById("app");
  const { success, data, message } = await getCollaborators();
  app.innerHTML = "";
  if (!success) return app.innerHTML = `<p>Error: ${message}</p>`;
  data.forEach(c => {
    const div = document.createElement("div");
    div.className = "collaborator-card";
    div.innerHTML = `<h4>${c.name}</h4><p>Role: ${c.role}</p>`;
    app.appendChild(div);
  });
}

export async function renderComments() {
  const app = document.getElementById("app");
  const { success, data, message } = await getComments();
  app.innerHTML = "";
  if (!success) return app.innerHTML = `<p>Error: ${message}</p>`;
  data.forEach(cm => {
    const div = document.createElement("div");
    div.className = "comment-card";
    div.innerHTML = `<p><strong>${cm.author}:</strong> ${cm.text}</p>`;
    app.appendChild(div);
  });
}