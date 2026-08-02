// server/controllers/chatController.js
const AIService = require("../services/aiService");
const User = require("../models/userModel");
const aiService = new AIService(process.env.OPENAI_KEY);

exports.handleChat = async (req, res) => {
  try {
    const { message, context, mode, username } = req.body;

    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username });
    }

    const activeMode = mode || user.preferences.mode || "default";

    const reply = await aiService.getAIResponse(message, context, activeMode);

    // Save mode + history
    user.preferences.mode = activeMode;
    user.history.push({ role: "user", content: message });
    user.history.push({ role: "ai", content: reply });
    await user.save();

    res.json({ reply, mode: activeMode, history: user.history });
  } catch (err) {
    res.status(500).json({ error: "Chatbot failed to respond" });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.json({ history: [] });
    res.json({ history: user.history });
  } catch (err) {
    res.status(500).json({ error: "Failed to load history" });
  }
};

exports.clearHistory = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.json({ success: false, message: "User not found" });

    user.history = [];
    await user.save();

    res.json({ success: true, message: "History cleared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear history" });
  }
};