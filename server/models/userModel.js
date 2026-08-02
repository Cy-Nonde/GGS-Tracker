// server/models/userModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "ai"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  preferences: {
    mode: { type: String, default: "default" }
  },
  history: [messageSchema]
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);