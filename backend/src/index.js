const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const sweetRoutes = require("./routes/sweetRoutes");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//authRotes
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

//sweetRotes 
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);


// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Sweet Shop API is running" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
