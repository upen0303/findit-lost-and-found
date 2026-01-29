const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }, // user or admin
  phone: String,
  address: String,
  city: String,
  profileImage: String,
  bio: String,
  
  // Email Verification
  isEmailVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationTokenExpiry: Date,
  
  // Password Reset
  resetToken: String,
  resetTokenExpiry: Date,
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
