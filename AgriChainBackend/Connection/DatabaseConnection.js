// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = "mongodb://127.0.0.1:27017/AgroChainDatabase";
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;