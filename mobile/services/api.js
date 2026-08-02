// mobile/services/api.js
export async function register(username, password) {
  const res = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function login(username, password) {
  const res = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (data.success) {
    global.API_TOKEN = `Bearer ${data.token}`;
    global.USERNAME = data.username;
  }
  return data;
}

export async function sendMessage(message, context = [], mode = "default", username = "guest") {
  try {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${global.API_TOKEN || ""}`
      },
      body: JSON.stringify({ message, context, mode, username })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (err) {
    console.error("Mobile API error:", err);
    return { reply: "⚠️ Error: Unable to reach AI service.", mode };
  }
}

export async function loadHistory(username = "guest") {
  try {
    const response = await fetch(`http://localhost:3000/api/history/${username}`, {
      headers: { "Authorization": `Bearer ${global.API_TOKEN || ""}` }
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
    const response = await fetch(`http://localhost:3000/api/history/${username}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${global.API_TOKEN || ""}` }
    });
    const data = await response.json();
    return data.success;
  } catch (err) {
    console.error("Clear history error:", err);
    return false;
  }
}
