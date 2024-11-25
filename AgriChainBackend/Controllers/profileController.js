const Profile = require("../models/profile");
const User = require("../models/user");

const getUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", [
      "fullname",
      "email",
      "contact",
      "address",
    ]);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { getUserProfile };
