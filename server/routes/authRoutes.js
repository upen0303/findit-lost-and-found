const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const auth = require("../middlewares/authMiddleware");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/upload");

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

    await User.create({
      name,
      email,
      password: hashed
    });

    res.json({ msg: "User registered successfully" });

  } catch (err) {
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

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });

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

module.exports = router;
