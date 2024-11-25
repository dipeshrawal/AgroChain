
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Check if the Authorization header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Correctly extract the token by splitting the header value
    const token = authHeader.split(" ")[1];
    console.log(token);  // Debug the token value

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach decoded user data to the request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;