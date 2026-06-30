// public/js/app.js
import { 
  getProjects, getTasks, getCollaborators, getComments,
  addProject, addTask, addCollaborator, addComment,
  updateProject, updateTask, updateCollaborator, updateComment,
  deleteProject, deleteTask, deleteCollaborator, deleteComment
} from "./api.js";
import { renderProjects, renderTasks, renderCollaborators, renderComments, renderTimeline } from "./ui.js";

// --- Login / Logout ---
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

// --- Health Check ---
async function checkServerHealth() {
  try {
    const res = await fetch("/api/health");
    const json = await res.json();
    if (json.success) {
      console.log("Health:", json.message, json.timestamp);
      document.getElementById("health").innerText = `✅ ${json.message}`;
    } else {
      document.getElementById("health").innerText = `❌ Server error`;
    }
  } catch (err) {
    console.error(err);
    document.getElementById("health").innerText = `❌ Cannot reach server`;
  }
}

// --- Initialization ---
document.addEventListener("DOMContentLoaded", async () => {
  // Render login status
  renderUserStatus();

  // Wire up navigation buttons
  document.getElementById("projectsBtn").addEventListener("click", renderProjects);
  document.getElementById("tasksBtn").addEventListener("click", renderTasks);
  document.getElementById("collaboratorsBtn").addEventListener("click", renderCollaborators);
  document.getElementById("commentsBtn").addEventListener("click", renderComments);

document.getElementById("timelineBtn").addEventListener("click", renderTimeline);

  // Default view
  await renderProjects();

  // Health check
  await checkServerHealth();
});
