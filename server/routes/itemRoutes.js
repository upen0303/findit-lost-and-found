const express = require("express");
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const auth = require("../middlewares/authMiddleware");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/upload");

const router = express.Router();

// Create Lost Item
router.post("/lost", auth, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const item = await LostItem.create({
      ...req.body,
      image: result.secure_url,
      user: req.user.id
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "Error creating lost item" });
  }
});

// Create Found Item
router.post("/found", auth, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const item = await FoundItem.create({
      ...req.body,
      image: result.secure_url,
      user: req.user.id
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "Error creating found item" });
  }
});

// Get All Lost Items
router.get("/lost", async (req, res) => {
  try {
    const items = await LostItem.find().populate("user", "name email phone").sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching lost items" });
  }
});

// Get All Found Items
router.get("/found", async (req, res) => {
  try {
    const items = await FoundItem.find().populate("user", "name email phone").sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching found items" });
  }
});

// Get item detail by ID (works for both lost and found)
router.get("/lost/:id", async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id).populate("user", "name email phone address city");
    if (!item) return res.status(404).json({ msg: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching item" });
  }
});

router.get("/found/:id", async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id).populate("user", "name email phone address city");
    if (!item) return res.status(404).json({ msg: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching item" });
  }
});

// Update Lost Item
router.put("/lost/:id", auth, upload.single("image"), async (req, res) => {
  try {
    let updateData = req.body;
    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.image = result.secure_url;
    }

    const item = await LostItem.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!item) return res.status(404).json({ msg: "Item not found" });
    res.json({ msg: "Item updated successfully", item });
  } catch (err) {
    res.status(500).json({ msg: "Error updating item" });
  }
});

// Update Found Item
router.put("/found/:id", auth, upload.single("image"), async (req, res) => {
  try {
    let updateData = req.body;
    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.image = result.secure_url;
    }

    const item = await FoundItem.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!item) return res.status(404).json({ msg: "Item not found" });
    res.json({ msg: "Item updated successfully", item });
  } catch (err) {
    res.status(500).json({ msg: "Error updating item" });
  }
});

// Delete Lost Item
router.delete("/lost/:id", auth, async (req, res) => {
  try {
    const item = await LostItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ msg: "Item not found" });
    res.json({ msg: "Lost item deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting item" });
  }
});

// Delete Found Item
router.delete("/found/:id", auth, async (req, res) => {
  try {
    const item = await FoundItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ msg: "Item not found" });
    res.json({ msg: "Found item deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting item" });
  }
});

// Match Lost and Found Items
router.get("/match", async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    const foundItems = await FoundItem.find();

    const matches = [];

    lostItems.forEach(lost => {
      foundItems.forEach(found => {
        if (
          lost.category === found.category &&
          lost.location === found.location
        ) {
          matches.push({ lost, found });
        }
      });
    });

    res.json(matches);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching matches" });
  }
});

module.exports = router;


