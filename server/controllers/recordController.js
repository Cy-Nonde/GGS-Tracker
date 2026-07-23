// recordController.js
const NotificationService = require('./notificationService');
const Record = require('./record');
const milestones = [5, 10, 20]; // Example thresholds

exports.addRecord = async (req, res) => {
  try {
    const record = await Record.create({ userId: req.body.userId, data: req.body.data });

    // Count user records
    const count = await Record.countDocuments({ userId: req.body.userId });

    // Check milestone
    if (milestones.includes(count)) {
      await NotificationService.sendNotification(
        req.body.userId,
        `Congrats! You’ve logged ${count} records.`,
        `${count} records`
      );
    }

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};