const express = require("express");
const Notification = require("../models/Notification");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

// Get all unread notifications for user
router.get("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .populate("relatedUser", "name email profileImage")
      .sort({ createdAt: -1 })
      .limit(20);
    
    const unreadCount = await Notification.countDocuments({ user: req.user.id, isRead: false });
    
    res.json({ notifications, unreadCount });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching notifications" });
  }
});

// Mark notification as read
router.put("/:id/read", auth, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(notification);
  } catch (err) {
    res.status(500).json({ msg: "Error updating notification" });
  }
});

// Mark all notifications as read
router.put("/read-all", auth, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { isRead: true }
    );
    res.json({ msg: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ msg: "Error updating notifications" });
  }
});

// Delete notification
router.delete("/:id", auth, async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ msg: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting notification" });
  }
});

// Create notification (internal use)
router.post("/create", async (req, res) => {
  try {
    const { user, type, title, message, relatedItem, relatedUser } = req.body;
    
    const notification = await Notification.create({
      user,
      type,
      title,
      message,
      relatedItem,
      relatedUser
    });
    
    res.json(notification);
  } catch (err) {
    res.status(500).json({ msg: "Error creating notification" });
  }
});

module.exports = router;
