// server/routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const { handleChat, getHistory } = require("../controllers/chatController");

router.post("/chat", handleChat);
router.get("/history/:username", getHistory);
router.delete("/history/:username", require("../controllers/chatController").clearHistory);


module.exports = router;
