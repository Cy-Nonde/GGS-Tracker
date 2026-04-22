// server/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
};

// project retrieval
exports.getAllProjects = (req, res, next) => {
  try {
    let projects = Project.getAll();
    if (req.query.sort) {
      projects = projects.sort((a, b) => a[req.query.sort].localeCompare(b[req.query.sort]));
      if (req.query.order === "desc") projects.reverse();
    }
    res.json({ success: true, data: projects });
  } catch (err) { next(err); }
};
