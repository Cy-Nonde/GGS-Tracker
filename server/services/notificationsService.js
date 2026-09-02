// services/notificationService.js
const admin = require('firebase-admin'); // Android
const apn = require('apn'); // iOS
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ggs.db');
const User = require('../models/user'); // assumes you have a user model

module.exports = (io) => {
  return {
    async sendNotification(userId, projectId, message, milestone) {
      const deliveredAt = new Date().toISOString();
      let status = 'sent';

      try {
        const user = await User.findById(userId);
        if (!user || !user.deviceToken) throw new Error('No device token');

        const payload = {
          notification: {
            title: 'Milestone Reached!',
            body: `${message} (${milestone})`,
          },
        };

        // Send via FCM (Android)
        if (user.platform === 'android') {
          await admin.messaging().sendToDevice(user.deviceToken, payload);
        }

        // Send via APN (iOS)
        if (user.platform === 'ios') {
          const apnProvider = new apn.Provider({ /* cert/key config */ });
          const note = new apn.Notification();
          note.alert = payload.notification.body;
          note.topic = 'com.ggs.tracker';
          await apnProvider.send(note, user.deviceToken);
        }
      } catch (err) {
        console.error('Notification error:', err);
        status = 'failed';
      }

      // Log notification in SQLite
      db.run(
        `INSERT INTO notifications (userId, projectId, milestone, message, deliveredAt, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, projectId, milestone, message, deliveredAt, status],
        function (err) {
          if (err) {
            console.error('Notification insert error:', err);
            return;
          }

          const newNotification = {
            id: this.lastID,
            userId,
            projectId,
            milestone,
            message,
            deliveredAt,
            status,
          };

          // 🔔 Emit to socket clients
          io.emit('notificationSent', newNotification);
          console.log('Notification stored + emitted:', newNotification);
        }
      );

      return status === 'sent';
    },
  };
};
