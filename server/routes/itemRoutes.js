const express = require("express");
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const auth = require("../middlewares/authMiddleware");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/upload");

const router = express.Router();

// Create Lost Item
router.post("/lost", auth, upload.single("image"), async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
  const item = await LostItem.create({
    ...req.body,
    image: result.secure_url,
    user: req.user.id
  });
  res.json(item);
});

// Create Found Item
router.post("/found", auth, upload.single("image"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  const item = await FoundItem.create({
    ...req.body,
    image: result.secure_url,
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

// Match Lost and Found Items
router.get("/match", async (req, res) => {
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
});

module.exports = router;


