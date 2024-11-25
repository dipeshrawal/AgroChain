// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./Connection/DatabaseConnection")
const app = express();
const port = 5000;
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/ProductRoutes");
const stakeholderRoutes = require("./routes/stakeholderdataRoutes");
const profileRoutes = require("./routes/profle");
const userProfileRoutes = require("./routes/userProfileRoutes")

// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,  
  })
);


connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stakeholder', stakeholderRoutes);
app.use("/api/profiledata", profileRoutes);

app.use("api/users", userProfileRoutes);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});