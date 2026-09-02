// public/js/app.js
import { 
  sendMessage, 
  loadHistory, 
  clearHistory, 
  login, 
  register, 
  updateMode, 
  changePassword,
  fetchNotifications,
  fetchRecords,
  fetchTimeline,
  fetchCollaborators,
  fetchComments,
  fetchProjectHistory
} from "./api.js";
import { renderMessage, renderNotification, renderRecord, renderTimeline, renderCollaborator, renderComment, renderHistory } from "./ui.js";

// Existing DOM refs...
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
const toggleDarkBtn = document.getElementById("toggle-dark");
const logoutBtn = document.getElementById("logout-btn");

// New DOM refs for extra features
const notificationsBtn = document.getElementById("notifications-btn");
const recordsBtn = document.getElementById("records-btn");
const timelineBtn = document.getElementById("timeline-btn");
const collaboratorsBtn = document.getElementById("collaborators-btn");
const commentsBtn = document.getElementById("comments-btn");
const historyBtn = document.getElementById("history-btn");

let currentMode = "default";
let username = "guest";

// Load chat history after login
async function initChat() {
  const history = await loadHistory(username);
  chatWindow.innerHTML = "";
  history.forEach(msg => renderMessage(msg.role, msg.content));
  if (history.length > 0) {
    currentMode = history[history.length - 1].mode || "default";
    modeSelect.value = currentMode;
  }
}

// Chat submission
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
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// Dark mode toggle
toggleDarkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("USERNAME");
  localStorage.removeItem("API_TOKEN");
  username = "guest";
  window.USERNAME = null;
  window.API_TOKEN = null;
  alert("Logged out successfully!");
  chatWindow.innerHTML = "";
  modeSelect.value = "default";
});

// ✅ New feature buttons
notificationsBtn.addEventListener("click", async () => {
  const notes = await fetchNotifications(username);
  notes.forEach(n => renderNotification(n));
});

recordsBtn.addEventListener("click", async () => {
  const recs = await fetchRecords(username);
  recs.forEach(r => renderRecord(r));
});

timelineBtn.addEventListener("click", async () => {
  const timeline = await fetchTimeline(username);
  timeline.forEach(t => renderTimeline(t));
});

collaboratorsBtn.addEventListener("click", async () => {
  const collabs = await fetchCollaborators(username);
  collabs.forEach(c => renderCollaborator(c));
});

commentsBtn.addEventListener("click", async () => {
  const comments = await fetchComments(username);
  comments.forEach(c => renderComment(c));
});

historyBtn.addEventListener("click", async () => {
  const history = await fetchProjectHistory(username);
  history.forEach(h => renderHistory(h));
});
