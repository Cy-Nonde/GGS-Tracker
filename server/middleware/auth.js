 // server/middleware/auth.js
module.exports = async (req, res, next) => {
  try {
    const user = await Promise.resolve(req.headers["x-user"])
      .then(data => data);

    if (!user) {
      return res.status(401).json({ success: false, message: "Login required" });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    next(err);
  }
};

