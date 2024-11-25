const UserProfile = require("../models/profile");
const User = require("../models/user");

const userProfile = async (req, res) => {
  try {
    const { fullname, email, contact, address, password, role, bio } = req.body;

    // Validate required fields
    if (!fullname || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create the user
    const newUser = new User({ fullname, email, contact, address, password, role });
    const savedUser = await newUser.save();

    // Create the profile linked to the user
    const newProfile = new UserProfile({ user: savedUser._id, bio });
    const savedProfile = await newProfile.save();

    res.status(201).json({
      message: "User and profile created successfully",
      user: savedUser,
      profile: savedProfile,
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = userProfile;
