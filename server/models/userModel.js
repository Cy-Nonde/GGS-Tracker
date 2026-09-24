const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "../database.sqlite")
);

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      mode TEXT DEFAULT 'default'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      role TEXT CHECK(role IN ('user', 'ai')) NOT NULL,
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

class User {
  // Create user
  static async create({ username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO users (username, password) VALUES (?, ?)`,
        [username, hashedPassword],
        function (err) {
          if (err) return reject(err);

          resolve({
            id: this.lastID,
            username
          });
        }
      );
    });
  }

  // Find user by username
  static findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM users WHERE username = ?`,
        [username],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });
  }

  // Find user by id
  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM users WHERE id = ?`,
        [id],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });
  }

  // Compare password
  static async comparePassword(candidate, hashedPassword) {
    return bcrypt.compare(candidate, hashedPassword);
  }

  // Save chat message
  static saveMessage(userId, role, content) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO messages (user_id, role, content)
         VALUES (?, ?, ?)`,
        [userId, role, content],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID);
        }
      );
    });
  }

  // Get chat history
  static getHistory(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT role, content, timestamp
         FROM messages
         WHERE user_id = ?
         ORDER BY timestamp ASC`,
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }
}

module.exports = { User, db };
