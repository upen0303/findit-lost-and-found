const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const auth = require("../middlewares/authMiddleware");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/upload");
const { sendVerificationEmail, sendPasswordResetEmail } = require("../utils/emailService");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    await User.create({
      name,
      email,
      password: hashed,
      verificationToken,
      verificationTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      isEmailVerified: false // Will be true once email is verified
    });

    // Try to send verification email, but don't fail registration if it fails
    try {
      await sendVerificationEmail(email, verificationToken);
      return res.json({ 
        msg: "User registered successfully. Please check your email to verify your account.",
        email,
        requiresVerification: true
      });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      // Allow registration even if email fails - user can still login
      return res.json({ 
        msg: "User registered successfully. Note: Email verification is currently unavailable. You can still login.",
        email,
        requiresVerification: false
      });
    }

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      "secret123",
      { expiresIn: "7d" }
    );

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get user profile with their items
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const lostItems = await LostItem.find({ user: req.user.id });
    const foundItems = await FoundItem.find({ user: req.user.id });

    res.json({
      user,
      stats: {
        totalItemsPosted: lostItems.length + foundItems.length,
        lostItems: lostItems.length,
        foundItems: foundItems.length
      },
      items: { lostItems, foundItems }
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Update user profile
router.put("/profile", auth, upload.single("profileImage"), async (req, res) => {
  try {
    const { name, phone, address, city, bio } = req.body;
    
    const updateData = {
      name: name || undefined,
      phone: phone || undefined,
      address: address || undefined,
      city: city || undefined,
      bio: bio || undefined
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.profileImage = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select("-password");

    res.json({ msg: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Verify email
router.post("/verify-email", async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired verification token" });
    }

    user.isEmailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    res.json({ msg: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Forgot password - send reset email
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    // Send password reset email
    try {
      await sendPasswordResetEmail(email, resetToken);
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      return res.status(500).json({ msg: "Failed to send reset email" });
    }

    res.json({ msg: "Password reset email sent. Please check your email." });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Reset password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired reset token" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ msg: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
