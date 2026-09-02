// server/services/aiService.js
const fetch = require("node-fetch");
const { getPrompt } = require("../data/prompts/systemPrompts");

class AIService {
  constructor(apiKey, model = "gpt-4") {
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = "https://api.openai.com/v1/chat/completions";
  }

  async getAIResponse(message, context = [], mode = "default") {
    try {
      const systemPrompt = getPrompt(mode);

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: "system", content: systemPrompt },
            ...context,
            { role: "user", content: message }
          ]
        })
      });

      const data = await response.json();
      if (!data.choices || !data.choices[0]) {
        throw new Error("No AI response received");
      }
      return data.choices[0].message.content;
    } catch (err) {
      console.error("AIService error:", err);
      throw err;
    }
  }
}

module.exports = AIService;
