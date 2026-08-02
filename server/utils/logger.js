// server/utils/logger.js
const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../../logs/chat.log");

function logInteraction(userMessage, aiReply) {
  const entry = `[${new Date().toISOString()}] USER: ${userMessage}\nAI: ${aiReply}\n\n`;
  fs.appendFileSync(logFile, entry, "utf8");
}

module.exports = { logInteraction };
