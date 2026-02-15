const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ✅ REGISTER FOR EVENT (WITH CAPACITY CHECK)
router.post("/:eventId", authMiddleware, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id; // ✅ FIXED

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const alreadyRegistered = await Registration.findOne({
      user: userId,
      event: eventId,
    });

    if (alreadyRegistered) {
      return res.status(400).json({ message: "Already registered" });
    }

    const registeredCount = await Registration.countDocuments({
      event: eventId,
    });

    if (registeredCount >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    const registration = await Registration.create({
      user: userId,
      event: eventId,
    });

    res.status(201).json({
      message: "Registered successfully",
      registration,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET EVENTS REGISTERED BY LOGGED-IN USER
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user.id,
    }).populate("event");

    const events = registrations.map((r) => r.event);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ CANCEL REGISTRATION
router.delete("/:eventId", authMiddleware, async (req, res) => {
  try {
    const deleted = await Registration.findOneAndDelete({
      user: req.user.id,
      event: req.params.eventId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.json({ message: "Registration cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ ADMIN: GET ALL REGISTRATIONS FOR AN EVENT
router.get(
  "/admin/events/:eventId",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const registrations = await Registration.find({
        event: req.params.eventId,
      })
        .populate("user", "name email")
        .populate("event", "name date location");

      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
