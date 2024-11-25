const express = require("express");
const router = express.Router();
const profileController = require("../Controllers/profileController");
const auth = require("../middleware/authmiddleware");

// Update user profile
// router.put(
//   "/update",

//   profileImage.single("profileImage"),
//   profileController.updateUserProfile
// );

// Get authenticated user's profile
router.get("/profile", auth, profileController.getUserProfile);

// Get all user profiles
// router.get("/all", profileController.getAllUserProfiles);
router.put("/update", auth, profileController.updateUserProfile);
module.exports = router;
