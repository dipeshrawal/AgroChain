const jwt = require("jsonwebtoken"); // For generating and verifying tokens
const bcrypt = require("bcryptjs"); // For password hashing
const User = require("../models/user"); // Replace with the correct path to your User model

// Hardcoded JWT secret key (use .env in production)
const JWT_SECRET = "your_hardcoded_secret_key";

// Fetch users by role
exports.getUsersByRole = async (req, res) => {
    const { role } = req.params;
  
    try {
      // Validate role
      if (!["retailer", "farmer", "distributor"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
  
      // Find users with the specified role
      const users = await User.find({ role }).select("fullname email contact address");
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users by role:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
