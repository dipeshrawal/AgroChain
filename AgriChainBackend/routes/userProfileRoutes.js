const express = require("express");
const userProfile = require("../Controllers/userProfileController");
const app = express();
const router = express.Router();

router.post("/userProfile", userProfile);

module.exports = app;