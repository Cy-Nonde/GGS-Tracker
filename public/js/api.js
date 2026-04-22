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
    return { success: false, message: err.message };
  }
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