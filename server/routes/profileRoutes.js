//server/routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { updateMode, changePassword } = require("../controllers/profileController");

router.put("/profile/mode", auth, updateMode);
router.put("/profile/password", auth, changePassword);

module.exports = router;