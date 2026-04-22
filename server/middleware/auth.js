// server/middleware/auth.js
module.exports = (req, res, next) => {
  const user = req.headers["x-user"];
  if (!user) {
    return res.status(401).json({ success: false, message: "Login required" });
  }
  req.user = user; // attach user to request
  next();
};
