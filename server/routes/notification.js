// notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  milestone: String,
  message: String,
  deliveredAt: Date,
  status: { type: String, enum: ['sent', 'failed'] }
});

module.exports = mongoose.model('Notification', notificationSchema);