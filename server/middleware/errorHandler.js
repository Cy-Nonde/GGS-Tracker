// server/middleware/errorHandler.js
module.exports = async (err, req, res, next) => {
  try {
    await Promise.resolve().then(() => {
      // Default to 500 if no status code was set earlier
      const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

      res.status(statusCode).json({
        success: false,
        error: err.message || "Server Error"
      });
    });
  } catch (error) {
    // Fallback in case something goes wrong inside the handler itself
    res.status(500).json({
      success: false,
      error: "Unexpected error in error handler"
    });
  }
};
