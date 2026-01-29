const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  // Conversation participants
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  // Message content
  text: {
    type: String,
    required: true
  },
  
  // Related item (optional - for context about lost/found item)
  relatedItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LostItem" // or FoundItem, stored as string for flexibility
  },
  itemType: String, // 'lost' or 'found'
  
  // Message status
  isRead: {
    type: Boolean,
    default: false
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
messageSchema.index({ sender: 1, receiver: 1 });
messageSchema.index({ receiver: 1, isRead: 1 });
messageSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Message", messageSchema);
