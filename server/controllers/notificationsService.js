// notificationService.js
const apn = require('apn'); // For iOS
const admin = require('firebase-admin'); // For Android

// Initialize Firebase Admin SDK separately with service account
// Initialize APN provider with your key/cert

module.exports = {
  async sendNotification(userId, message, milestone) {
    try {
      // Lookup user device token from DB
      const user = await User.findById(userId);
      if (!user || !user.deviceToken) throw new Error("No device token");

      const payload = {
        notification: {
          title: "Milestone Reached!",
          body: `${message} (${milestone})`
        }
      };

      // Example: send via FCM
      await admin.messaging().sendToDevice(user.deviceToken, payload);

      // Log notification
      await Notification.create({
        userId,
        milestone,
        message,
        deliveredAt: new Date(),
        status: "sent"
      });

      return true;
    } catch (err) {
      console.error("Notification error:", err);
      await Notification.create({
        userId,
        milestone,
        message,
        deliveredAt: new Date(),
        status: "failed"
      });
      return false;
    }
  }
};