const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // ✅ NOW req is valid (inside function)
    console.log("AUTH HEADER:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({ msg: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};