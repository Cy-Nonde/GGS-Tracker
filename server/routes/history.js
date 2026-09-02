// routes/history.js
const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// ✅ Unified project history (with pagination)
router.get('/projects/:id/history', async (req, res) => {
  try {
    const projectId = req.params.id;
    const limit = parseInt(req.query.limit, 10) || 50;
    const offset = parseInt(req.query.offset, 10) || 0;

    const history = await historyController.getProjectHistory(projectId, limit, offset);
    res.json(history);
  } catch (err) {
    console.error('History route error:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// ✅ Records only (with pagination)
router.get('/projects/:id/history/records', async (req, res) => {
  try {
    const projectId = req.params.id;
    const limit = parseInt(req.query.limit, 10) || 50;
    const offset = parseInt(req.query.offset, 10) || 0;

    const records = await historyController.getProjectRecords(projectId, limit, offset);
    res.json(records);
  } catch (err) {
    console.error('Records route error:', err);
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});

// ✅ Notifications only (with pagination)
router.get('/projects/:id/history/notifications', async (req, res) => {
  try {
    const projectId = req.params.id;
    const limit = parseInt(req.query.limit, 10) || 50;
    const offset = parseInt(req.query.offset, 10) || 0;

    const notifications = await historyController.getProjectNotifications(projectId, limit, offset);
    res.json(notifications);
  } catch (err) {
    console.error('Notifications route error:', err);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// ✅ Export history (JSON or CSV)
router.get('/projects/:id/history/export/:format', async (req, res) => {
  try {
    const projectId = req.params.id;
    const format = req.params.format; // 'json' or 'csv'
    const limit = parseInt(req.query.limit, 10) || 1000; // export larger chunks
    const offset = parseInt(req.query.offset, 10) || 0;

    const history = await historyController.getProjectHistory(projectId, limit, offset);

    if (format === 'csv') {
      const csv = historyController.convertHistoryToCSV(history);
      res.header('Content-Type', 'text/csv');
      res.attachment(`project-${projectId}-history.csv`);
      return res.send(csv);
    }

    res.json(history);
  } catch (err) {
    console.error('Export route error:', err);
    res.status(500).json({ error: 'Failed to export history' });
  }
});

// ✅ Search/filter history (with pagination)
router.get('/projects/:id/history/search', async (req, res) => {
  try {
    const projectId = req.params.id;
    const { q, type } = req.query; // keyword + optional type filter
    const limit = parseInt(req.query.limit, 10) || 50;
    const offset = parseInt(req.query.offset, 10) || 0;

    const history = await historyController.searchProjectHistory(projectId, q, type, limit, offset);
    res.json(history);
  } catch (err) {
    console.error('Search route error:', err);
    res.status(500).json({ error: 'Failed to search history' });
  }
});

module.exports = router;
