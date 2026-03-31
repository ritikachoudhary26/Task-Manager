const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");



// ✅ REGISTER
exports.register = async (req, res) => {
  try {
    const { name,email, password } = req.body;

    // Check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const user = await User.create({
        name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ msg: "User registered successfully" });

  } catch (error) {
  console.error("ERROR:", error); // 👈 ADD THIS
  res.status(500).json({
    msg: "Server error",
    error: error.message
  });
}
};


// ✅ LOGIN
exports.login = async (req, res) => {
  try {
    console.log("Login req.body:", req.body); // 👈 check what is coming

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" });

    res.json({ msg: "Login successful", token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};