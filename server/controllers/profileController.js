//server/controllers/profileController.js
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.updateMode = async (req, res) => {
  try {
    const { mode } = req.body;
    const user = await User.findById(req.userId);
    user.preferences.mode = mode;
    await user.save();
    res.json({ success: true, mode });
  } catch {
    res.status(500).json({ error: "Failed to update mode" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.userId);
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ error: "Incorrect old password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: "Password updated" });
  } catch {
    res.status(500).json({ error: "Failed to change password" });
  }
};
