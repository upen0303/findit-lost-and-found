const express = require("express");
const auth = require("../middlewares/authMiddleware");
const Message = require("../models/Message");
const User = require("../models/User");

const router = express.Router();

// Get all conversations for current user (with latest message)
router.get("/conversations", auth, async (req, res) => {
  try {
    // Find all unique users this user has messaged with
    const messages = await Message.find({
      $or: [
        { sender: req.user.id },
        { receiver: req.user.id }
      ]
    })
      .populate("sender", "name email profileImage")
      .populate("receiver", "name email profileImage")
      .sort({ createdAt: -1 });

    // Group by conversation (both directions)
    const conversations = {};
    messages.forEach(msg => {
      const otherUserId = msg.sender._id.toString() === req.user.id 
        ? msg.receiver._id.toString() 
        : msg.sender._id.toString();
      
      if (!conversations[otherUserId]) {
        const otherUser = msg.sender._id.toString() === req.user.id ? msg.receiver : msg.sender;
        conversations[otherUserId] = {
          _id: otherUserId,
          name: otherUser.name,
          email: otherUser.email,
          profileImage: otherUser.profileImage,
          lastMessage: msg.text,
          lastMessageTime: msg.createdAt,
          unreadCount: 0
        };
      }
      
      // Count unread messages from this user
      if (msg.receiver._id.toString() === req.user.id && !msg.isRead) {
        conversations[otherUserId].unreadCount++;
      }
    });

    const conversationList = Object.values(conversations).sort(
      (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );

    res.json({ conversations: conversationList, unreadTotal: conversationList.reduce((sum, c) => sum + c.unreadCount, 0) });
  } catch (err) {
    console.error("Error fetching conversations:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get messages between current user and another user
router.get("/messages/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id }
      ]
    })
      .populate("sender", "name email profileImage")
      .populate("receiver", "name email profileImage")
      .sort({ createdAt: 1 });

    res.json({ messages });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Send a message
router.post("/send", auth, async (req, res) => {
  try {
    const { receiverId, text, relatedItem, itemType } = req.body;

    if (!receiverId || !text) {
      return res.status(400).json({ msg: "Receiver ID and message text required" });
    }

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(400).json({ msg: "Receiver not found" });
    }

    const message = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      text,
      relatedItem: relatedItem || null,
      itemType: itemType || null
    });

    const populatedMessage = await message.populate("sender", "name email profileImage").populate("receiver", "name email profileImage");

    res.json({ msg: "Message sent", message: populatedMessage });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Mark message as read
router.put("/mark-read/:messageId", auth, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ msg: "Message not found" });
    }

    res.json({ msg: "Message marked as read", message });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Mark all messages from a user as read
router.put("/mark-all-read/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    await Message.updateMany(
      {
        sender: userId,
        receiver: req.user.id,
        isRead: false
      },
      { isRead: true }
    );

    res.json({ msg: "All messages marked as read" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete a message
router.delete("/:messageId", auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);

    if (!message) {
      return res.status(404).json({ msg: "Message not found" });
    }

    // Only sender can delete their own message
    if (message.sender.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await Message.findByIdAndDelete(req.params.messageId);
    res.json({ msg: "Message deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
