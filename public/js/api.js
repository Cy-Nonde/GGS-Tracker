// public/js/api.js

async function apiRequest(url, method = "GET", body = null) {
  try {
    const options = { method, headers: { "Content-Type": "application/json" } };
    const user = localStorage.getItem("user");
    if (user) options.headers["x-user"] = user; // attach simulated login
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
}

export async function register(username, password) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function login(username, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (data.success) {
    window.API_TOKEN = `Bearer ${data.token}`;
    window.USERNAME = data.username;
  }
  return data;
}


export async function sendMessage(message, context = [], mode = "default", username = "guest") {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.API_TOKEN || ""}`
      },
      body: JSON.stringify({ message, context, mode, username })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (err) {
    console.error("API error:", err);
    return { reply: "⚠️ Error: Unable to reach AI service.", mode };
  }
}

export async function loadHistory(username = "guest") {
  try {
    const response = await fetch(`/api/history/${username}`, {
      headers: { "Authorization": `Bearer ${window.API_TOKEN || ""}` }
    });
    const data = await response.json();
    return data.history || [];
  } catch (err) {
    console.error("History load error:", err);
    return [];
  }
}

export async function clearHistory(username = "guest") {
  try {
    const response = await fetch(`/api/history/${username}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${window.API_TOKEN || ""}` }
    });
    const data = await response.json();
    return data.success;
  } catch (err) {
    console.error("Clear history error:", err);
    return false;
  }
}

export async function updateMode(mode) {
  const res = await fetch("/api/profile/mode", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": window.API_TOKEN
    },
    body: JSON.stringify({ mode })
  });
  return res.json();
}

export async function changePassword(oldPassword, newPassword) {
  const res = await fetch("/api/profile/password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": window.API_TOKEN
    },
    body: JSON.stringify({ oldPassword, newPassword })
  });
  return res.json();
}

export async function getCollaborators() {
  return await apiRequest("/api/collaborators");
}
export async function addCollaborator(collab) {
  return await apiRequest("/api/collaborators", "POST", collab);
}
export async function updateCollaborator(id, updates) {
  return await apiRequest(`/api/collaborators/${id}`, "PUT", updates);
}
export async function deleteCollaborator(id) {
  return await apiRequest(`/api/collaborators/${id}`, "DELETE");
}

export async function getComments() {
  return await apiRequest("/api/comments");
}
export async function addComment(comment) {
  return await apiRequest("/api/comments", "POST", comment);
}
export async function updateComment(id, updates) {
  return await apiRequest(`/api/comments/${id}`, "PUT", updates);
}
export async function deleteComment(id) {
  return await apiRequest(`/api/comments/${id}`, "DELETE");
}

export async function getProjects() {
  return await apiRequest("/api/projects");
}
export async function addProject(project) {
  return await apiRequest("/api/projects", "POST", project);
}
export async function updateProject(id, updates) {
  return await apiRequest(`/api/projects/${id}`, "PUT", updates);
}
export async function deleteProject(id) {
  return await apiRequest(`/api/projects/${id}`, "DELETE");
}

export async function getTasks() {
  return await apiRequest("/api/tasks");
}
export async function addTask(task) {
  return await apiRequest("/api/tasks", "POST", task);
}
export async function updateTask(id, updates) {
  return await apiRequest(`/api/tasks/${id}`, "PUT", updates);
}
export async function deleteTask(id) {
  return await apiRequest(`/api/tasks/${id}`, "DELETE");
}
