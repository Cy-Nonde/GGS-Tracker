// routes/records.js
module.exports = (io) => {
  const router = require('express').Router();
  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database('./ggs.db');
  const recordController = require('../controllers/recordController');

  // Ensure table exists
  db.run(`
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      projectId INTEGER,
      data TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT,
      deletedAt TEXT
    )
  `);

  // ✅ GET all records for a project (with pagination, excluding deleted by default)
  router.get('/projects/:id/records', (req, res) => {
    const projectId = req.params.id;
    const limit = parseInt(req.query.limit, 10) || 50;
    const offset = parseInt(req.query.offset, 10) || 0;

    db.all(
      `SELECT * FROM records 
       WHERE projectId = ? AND deletedAt IS NULL 
       ORDER BY createdAt ASC 
       LIMIT ? OFFSET ?`,
      [projectId, limit, offset],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
      }
    );
  });

  // ✅ GET single record by ID
  router.get('/projects/:projectId/records/:recordId', (req, res) => {
    const { projectId, recordId } = req.params;
    db.get(
      `SELECT * FROM records WHERE id = ? AND projectId = ?`,
      [recordId, projectId],
      (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Record not found' });
        res.json(row);
      }
    );
  });

  // ✅ POST record (delegates to controller for milestone + notification logic)
  router.post('/projects/:id/records', (req, res) => {
    req.body.projectId = req.params.id;
    recordController.addRecord(req, res);
  });

  // ✅ PUT record (update)
  router.put('/projects/:projectId/records/:recordId', (req, res) => {
    req.params.id = req.params.recordId; // normalize param for controller
    recordController.updateRecord(req, res);
  });

  // ✅ DELETE record (soft delete)
  router.delete('/projects/:projectId/records/:recordId', (req, res) => {
    req.params.id = req.params.recordId; // normalize param for controller
    recordController.deleteRecord(req, res);
  });

  return router;
};
