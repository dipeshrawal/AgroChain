const jwt = require("jsonwebtoken"); // For generating and verifying tokens
const bcrypt = require("bcryptjs"); // For password hashing
const User = require("../models/user"); // Replace with the correct path to your User model
const Profile = require("../models/profile"); // Correct Profile model import

// Hardcoded JWT secret key (use .env in production)
const JWT_SECRET = "your_hardcoded_secret_key";

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Register User
exports.registerUser = async (req, res) => {
  const { fullname, email, contact, address, password, role } = req.body; // Include role in the request body

  try {
    // Validate role (optional, but ensures only allowed roles are used)
    if (!["farmer", "customer", "retailer", "distributor"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create and save the new user
    const newUser = new User({
      fullname,
      email,
      contact,
      address,
      password, // Plain password; hashing will be handled by the model
      role,
    });

    const savedUser = await newUser.save();

    // Automatically create a profile linked to the user
    const newProfile = new Profile({ user: savedUser._id });
    const savedProfile = await newProfile.save();

    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
      profile: savedProfile,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};
