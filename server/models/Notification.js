const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["match", "view", "comment", "admin"], default: "match" },
  title: String,
  message: String,
  relatedItem: { type: mongoose.Schema.Types.ObjectId, ref: "LostItem" || "FoundItem" },
  relatedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
