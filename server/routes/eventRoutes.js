const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

/* ======================================================
   PUBLIC ROUTES
   ====================================================== */

// ✅ GET ALL EVENTS (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

// ✅ GET SINGLE EVENT BY ID (PUBLIC)
router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({ message: "Invalid event ID" });
  }
});

/* ======================================================
   PROTECTED ROUTES (ADMIN ONLY)
   ====================================================== */

// ✅ CREATE EVENT
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ UPDATE EVENT
router.put("/:eventId", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      req.body,
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ DELETE EVENT
router.delete("/:eventId", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
