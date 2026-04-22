// public/js/app.js
function login(username) {
  localStorage.setItem("user", username);
  renderUserStatus();
}

function logout() {
  localStorage.removeItem("user");
  renderUserStatus();
}

function renderUserStatus() {
  const statusBar = document.getElementById("status");
  const user = localStorage.getItem("user");
  statusBar.innerHTML = user 
    ? `<p>Logged in as ${user} <button onclick="logout()">Logout</button></p>` 
    : `<p>Not logged in <button onclick="login('DemoUser')">Login</button></p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderUserStatus();
});


import { renderProjects, renderTasks } from "./ui.js";
import { renderCollaborators, renderComments } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("projectsBtn").addEventListener("click", renderProjects);
  document.getElementById("tasksBtn").addEventListener("click", renderTasks);
  document.getElementById("collaboratorsBtn").addEventListener("click", renderCollaborators);
  document.getElementById("commentsBtn").addEventListener("click", renderComments);
  renderProjects(); // default view
});