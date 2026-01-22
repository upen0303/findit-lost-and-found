const express = require("express");
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

// Create Lost Item
router.post("/lost", auth, async (req, res) => {
  const item = await LostItem.create({
    ...req.body,
    user: req.user.id
  });
  res.json(item);
});

// Create Found Item
router.post("/found", auth, async (req, res) => {
  const item = await FoundItem.create({
    ...req.body,
    user: req.user.id
  });
  res.json(item);
});

// Get All Lost Items
router.get("/lost", async (req, res) => {
  const items = await LostItem.find().sort({ createdAt: -1 });
  res.json(items);
});

// Get All Found Items
router.get("/found", async (req, res) => {
  const items = await FoundItem.find().sort({ createdAt: -1 });
  res.json(items);
});

module.exports = router;
