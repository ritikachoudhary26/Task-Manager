require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ⚠️ IMPORTANT: Allow deployed frontend
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ Connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ Use dynamic PORT (VERY IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

// ✅ Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));