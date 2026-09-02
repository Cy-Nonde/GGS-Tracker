// public/js/api.js

// ✅ Authentication
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

// ✅ Chat
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

// ✅ History
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

// ✅ Profile
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

// ✅ Extras (mobile features mirrored)

// Notifications
export async function fetchNotifications(projectId) {
  try {
    const res = await fetch(`/api/projects/${projectId}/history/notifications`, {
      headers: { "Authorization": `Bearer ${window.API_TOKEN || ""}` }
    });
    return await res.json();
  } catch (err) {
    console.error("Notifications fetch error:", err);
    return [];
  }
}

// Records
export async function fetchRecords(projectId) {
  try {
    const res = await fetch(`/api/projects/${projectId}/records`, {
      headers: { "Authorization": `Bearer ${window.API_TOKEN || ""}` }
    });
    return await res.json();
  } catch (err) {
    console.error("Records fetch error:", err);
    return [];
  }
}

// Timeline
export async function fetchTimeline(projectId) {
  try {
    const res = await fetch(`/api/projects/${projectId}/timeline`, {
      headers: { "Authorization": `Bearer ${window.API_TOKEN || ""}` }
    });
    return await res.json();
  } catch (err) {
    console.error("Timeline fetch error:", err);
    return [];
  }
}

// Collaborators
export async function fetchCollaborators(projectId) {
  try {
    const res = await fetch(`/api/projects/${projectId}/collaborators`, {
      headers: { "Authorization": `Bearer ${window.API_TOKEN || ""}` }
    });
    return await res.json();
  } catch (err) {
    console.error("Collaborators fetch error:", err);
    return [];
  }
}

// Comments
export async function fetchComments(projectId) {
  try {
    const res = await fetch(`/api/projects/${projectId}/comments`, {
      headers: { "Authorization": `Bearer ${window.API_TOKEN || ""}` }
    });
    return await res.json();
  } catch (err) {
    console.error("Comments fetch error:", err);
    return [];
  }
}

// Project History (combined records + notifications)
export async function fetchProjectHistory(projectId) {
  try {
    const res = await fetch(`/api/projects/${projectId}/history`, {
      headers: { "Authorization": `Bearer ${window.API_TOKEN || ""}` }
    });
    return await res.json();
  } catch (err) {
    console.error("Project history fetch error:", err);
    return [];
  }
}
