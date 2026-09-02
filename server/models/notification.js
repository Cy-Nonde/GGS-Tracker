// models/notification.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ggs.db');

// Initialize table
db.run(`
  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    milestone TEXT,
    message TEXT,
    deliveredAt TEXT,
    status TEXT
  )
`);

module.exports = {
  create: (notification) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO notifications (userId, milestone, message, deliveredAt, status)
         VALUES (?, ?, ?, ?, ?)`,
        [
          notification.userId,
          notification.milestone,
          notification.message,
          notification.deliveredAt,
          notification.status,
        ],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...notification });
        }
      );
    });
  },

  findByUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM notifications WHERE userId = ? ORDER BY deliveredAt DESC`, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
};
