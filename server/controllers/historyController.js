// controllers/historyController.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ggs.db');

// ✅ Unified history (records + notifications) with pagination
exports.getProjectHistory = (projectId, limit = 50, offset = 0) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT id, projectId, data, createdAt, updatedAt, deletedAt 
       FROM records WHERE projectId = ? 
       ORDER BY createdAt ASC 
       LIMIT ? OFFSET ?`,
      [projectId, limit, offset],
      (err, recordRows) => {
        if (err) return reject(err);

        const recordHistory = recordRows.flatMap((r) => {
          const entries = [];
          if (r.createdAt) {
            entries.push({
              id: `rec-${r.id}-created`,
              type: 'record',
              date: r.createdAt,
              message: `Record created: ${r.data}`,
            });
          }
          if (r.updatedAt) {
            entries.push({
              id: `rec-${r.id}-updated`,
              type: 'record-update',
              date: r.updatedAt,
              message: `Record updated: ${r.data}`,
            });
          }
          if (r.deletedAt) {
            entries.push({
              id: `rec-${r.id}-deleted`,
              type: 'record-delete',
              date: r.deletedAt,
              message: `Record deleted`,
            });
          }
          return entries;
        });

        db.all(
          `SELECT id, projectId, message, deliveredAt, status 
           FROM notifications WHERE projectId = ? 
           ORDER BY deliveredAt ASC 
           LIMIT ? OFFSET ?`,
          [projectId, limit, offset],
          (err2, noteRows) => {
            if (err2) return reject(err2);

            const notificationHistory = noteRows.map((n) => ({
              id: `note-${n.id}`,
              type: 'notification',
              date: n.deliveredAt,
              message: `${n.message} [${n.status}]`,
            }));

            const combined = [...recordHistory, ...notificationHistory].sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            );

            resolve(combined);
          }
        );
      }
    );
  });
};

// ✅ Records only with pagination
exports.getProjectRecords = (projectId, limit = 50, offset = 0) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT id, projectId, data, createdAt, updatedAt, deletedAt 
       FROM records WHERE projectId = ? 
       ORDER BY createdAt ASC 
       LIMIT ? OFFSET ?`,
      [projectId, limit, offset],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
};

// ✅ Notifications only with pagination
exports.getProjectNotifications = (projectId, limit = 50, offset = 0) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT id, projectId, message, deliveredAt, status 
       FROM notifications WHERE projectId = ? 
       ORDER BY deliveredAt ASC 
       LIMIT ? OFFSET ?`,
      [projectId, limit, offset],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
};

// ✅ Export history to CSV
exports.convertHistoryToCSV = (history) => {
  const header = 'id,type,date,message\n';
  const rows = history
    .map((h) => `${h.id},${h.type},${h.date},"${h.message.replace(/"/g, '""')}"`)
    .join('\n');
  return header + rows;
};

// ✅ Search/filter history (with pagination)
exports.searchProjectHistory = (projectId, keyword, type, limit = 50, offset = 0) => {
  return new Promise(async (resolve, reject) => {
    try {
      const history = await exports.getProjectHistory(projectId, limit, offset);
      const filtered = history.filter((h) => {
        const matchesKeyword = keyword ? h.message.toLowerCase().includes(keyword.toLowerCase()) : true;
        const matchesType = type ? h.type === type : true;
        return matchesKeyword && matchesType;
      });
      resolve(filtered);
    } catch (err) {
      reject(err);
    }
  });
};
