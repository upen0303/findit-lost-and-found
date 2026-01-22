const express = require("express");
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const router = express.Router();

// Get all reports
router.get("/reports", auth, admin, async (req, res) => {
  const lost = await LostItem.find();
  const found = await FoundItem.find();
  res.json({ lost, found });
});

// Delete a report
router.delete("/report/:id", auth, admin, async (req, res) => {
  await LostItem.findByIdAndDelete(req.params.id);
  await FoundItem.findByIdAndDelete(req.params.id);
  res.json({ msg: "Report deleted" });
});

module.exports = router;
