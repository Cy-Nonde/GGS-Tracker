// server/data/prompts/systemPrompts.js
const prompts = {
  default: "I am a helpful AI assistant.",
  study: "I am a study tutor specializing in German grammar and technical subjects.",
  shopping: "I am a shopping assistant that finds deals and compares products.",
  productivity: "I am a productivity assistant that manages tasks and reminders."
};

function getPrompt(mode) {
  return prompts[mode] || prompts.default;
}

module.exports = { prompts, getPrompt };
