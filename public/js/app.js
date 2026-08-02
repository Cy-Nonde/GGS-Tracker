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

import { 
  sendMessage, 
  loadHistory, 
  clearHistory, 
  login, 
  register, 
  updateMode, 
  changePassword 
} from "./api.js";
import { renderMessage } from "./ui.js";

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatWindow = document.getElementById("chat-window");
const modeSelect = document.getElementById("mode-select");
const clearBtn = document.getElementById("clear-history");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const passwordForm = document.getElementById("password-form");
const rememberMeCheckbox = document.getElementById("remember-me");
const saveModeBtn = document.getElementById("save-mode");

let currentMode = "default";
let username = "guest";

// Load history after login
async function initChat() {
  const history = await loadHistory(username);
  chatWindow.innerHTML = "";
  history.forEach(msg => renderMessage(msg.role, msg.content));
  if (history.length > 0) {
    currentMode = history[history.length - 1].mode || "default";
    modeSelect.value = currentMode;
  }
}

// Handle chat submission
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  const mode = modeSelect.value || currentMode;

  renderMessage("user", userMessage);
  chatInput.value = "";

  const { reply, mode: updatedMode } = await sendMessage(userMessage, [], mode, username);
  currentMode = updatedMode;
  modeSelect.value = updatedMode;

  renderMessage("ai", reply);
});

// Clear history
clearBtn.addEventListener("click", async () => {
  const success = await clearHistory(username);
  if (success) {
    chatWindow.innerHTML = "";
    currentMode = "default";
    modeSelect.value = "default";
  }
});

// Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const uname = document.getElementById("login-username").value;
  const pass = document.getElementById("login-password").value;
  const rememberMe = rememberMeCheckbox.checked;

  const result = await login(uname, pass);
  if (result.success) {
    username = result.username;
    window.API_TOKEN = `Bearer ${result.token}`;
    window.USERNAME = result.username;

    if (rememberMe) {
      localStorage.setItem("USERNAME", result.username);
      localStorage.setItem("API_TOKEN", `Bearer ${result.token}`);
    }

    alert("Login successful!");
    await initChat();
  } else {
    alert("Login failed: " + result.error);
  }
});

// Register
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const uname = document.getElementById("register-username").value;
  const pass = document.getElementById("register-password").value;
  const result = await register(uname, pass);
  alert(result.success ? "Registration successful!" : "Error: " + result.error);
});

// Change password
passwordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const oldPass = document.getElementById("old-password").value;
  const newPass = document.getElementById("new-password").value;
  const result = await changePassword(oldPass, newPass);
  alert(result.success ? "Password updated!" : "Error: " + result.error);
});

// Save mode preference
saveModeBtn.addEventListener("click", async () => {
  const mode = modeSelect.value;
  const result = await updateMode(mode);
  if (result.success) {
    alert("Mode preference saved!");
    currentMode = mode;
  }
});

// Auto-login if "Remember Me" was used
window.addEventListener("load", () => {
  const savedUser = localStorage.getItem("USERNAME");
  const savedToken = localStorage.getItem("API_TOKEN");
  if (savedUser && savedToken) {
    username = savedUser;
    window.API_TOKEN = savedToken;
    window.USERNAME = savedUser;
    initChat();
  }
});

//dark-mode
const toggleDarkBtn = document.getElementById("toggle-dark");

toggleDarkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Apply saved theme on load
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});

//Logout
const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("USERNAME");
  localStorage.removeItem("API_TOKEN");
  username = "guest";
  window.USERNAME = null;
  window.API_TOKEN = null;
  alert("Logged out successfully!");
  // Optionally reset UI
  chatWindow.innerHTML = "";
  modeSelect.value = "default";
});

//Hide or Show AI\\

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
  const chatBtn = document.getElementById("chatBtn");

  // Sections
  const authSection = document.getElementById("auth-section");
  const chatSection = document.getElementById("chat-section");
  const profileSection = document.getElementById("profile-section");
  const extrasSection = document.getElementById("extras-section");

  // Toggle Chatbot view
  chatBtn.addEventListener("click", () => {
    // Hide other app content if needed
    document.querySelectorAll("main > section").forEach(sec => {
      sec.style.display = "none";
    });

    // Show chatbot sections
    authSection.style.display = "block";
    chatSection.style.display = "block";
    profileSection.style.display = "block";
    extrasSection.style.display = "block";
  });
});

