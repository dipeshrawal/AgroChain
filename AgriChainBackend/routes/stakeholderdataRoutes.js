const express = require("express");
const router = express.Router();
const { getUsersByRole } = require("../Controllers/stakeholderdataController");

// Route to get users by role
router.get("/:role", getUsersByRole);

module.exports = router;
