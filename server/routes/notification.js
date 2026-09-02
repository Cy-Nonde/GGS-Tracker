// routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ deliveredAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
