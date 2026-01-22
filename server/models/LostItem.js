const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  location: String,
  date: Date,
  image: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Lost" }
}, { timestamps: true });

module.exports = mongoose.model("LostItem", lostItemSchema);
