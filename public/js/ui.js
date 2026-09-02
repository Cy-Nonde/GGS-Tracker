// public/js/ui.js

// ✅ Chat bubbles
export function renderMessage(role, text) {
  const chatWindow = document.getElementById("chat-window");
  const bubble = document.createElement("div");

  bubble.className = role === "user" ? "bubble user" : "bubble ai";
  bubble.textContent = text;

  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ✅ Notifications
export function renderNotification(note) {
  const container = document.getElementById("notifications-window");
  const item = document.createElement("div");
  item.className = "notification-item";
  item.textContent = `${note.message} (${note.status}) @ ${note.deliveredAt}`;
  container.appendChild(item);
}

// ✅ Records
export function renderRecord(record) {
  const container = document.getElementById("records-window");
  const item = document.createElement("div");
  item.className = "record-item";
  item.textContent = `#${record.id} ${record.data} [${record.createdAt}]`;
  container.appendChild(item);
}

// ✅ Timeline
export function renderTimeline(entry) {
  const container = document.getElementById("timeline-window");
  const item = document.createElement("div");
  item.className = "timeline-item";
  item.textContent = `${entry.date}: ${entry.message}`;
  container.appendChild(item);
}

// ✅ Collaborators
export function renderCollaborator(collab) {
  const container = document.getElementById("collaborators-window");
  const item = document.createElement("div");
  item.className = "collaborator-item";
  item.textContent = `${collab.name} (${collab.role})`;
  container.appendChild(item);
}

// ✅ Comments
export function renderComment(comment) {
  const container = document.getElementById("comments-window");
  const item = document.createElement("div");
  item.className = "comment-item";
  item.textContent = `${comment.author}: ${comment.text} @ ${comment.createdAt}`;
  container.appendChild(item);
}

// ✅ Project History (records + notifications combined)
export function renderHistory(entry) {
  const container = document.getElementById("history-window");
  const item = document.createElement("div");
  item.className = "history-item";
  item.textContent = `[${entry.type}] ${entry.date}: ${entry.message}`;
  container.appendChild(item);
}
