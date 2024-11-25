const jwt = require("jsonwebtoken"); // For generating and verifying tokens
const bcrypt = require("bcryptjs"); // For password hashing
const dotenv = require("dotenv");
const User = require("../models/user"); // Replace with the correct path to your User model
const Profile = require("../models/profile"); // Replace with the correct path to your Profile model

dotenv.config(); // Load environment variables

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "your_hardcoded_secret_key";

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, contact, address, password, role } = req.body;

    // Validate input fields
    if (!fullname || !email || !contact || !address || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate role
    const allowedRoles = ["farmer", "customer", "retailer", "distributor"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      fullname,
      email,
      contact,
      address,
      password,
      role,
    });

    const savedUser = await user.save();

    // Automatically create a profile linked to the user
    const newProfile = new Profile({ user: savedUser._id });
    const savedProfile = await newProfile.save();

    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
      profile: savedProfile,
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

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
    const payload = {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        message: "Login successful",
        token: `Bearer ${token}`,
        user,
        role: user.role,
      });
    });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
