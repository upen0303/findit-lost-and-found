const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  location: String,
  date: Date,
  image: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Found" }
}, { timestamps: true });

module.exports = mongoose.model("FoundItem", foundItemSchema);
