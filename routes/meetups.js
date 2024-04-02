const express = require("express");
const Meetup = require("../models/Meetup");
const isAdmin = require("../middleware/isAdmin");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Create meetup
router.post("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const createdBy = req.user._id;
    const meetup = await Meetup.create({
      title,
      description,
      date,
      location,
      createdBy,
    });
    res.status(201).json({ message: "Meetup created successfully", meetup });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const createdBy = req.user._id;
    const meetup = await Meetup.create({
      title,
      description,
      date,
      location,
      createdBy,
    });
    res.status(201).json({ message: "Meetup created successfully", meetup });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/", authMiddleware, async (req, res) => {
  try {
    const meetups = await Meetup.find({});
    res.status(201).json({ message: "Meetup found", meetups });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const createdBy = req.user._id;
    const meetups = await Meetup.find({ createdBy });
    res.status(201).json({ message: "Meetup found", meetups });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const createdBy = req.user._id;
    const meetup = await Meetup.find({ createdBy });
    if (!meetup) {
      return res.status(404).json({ message: "meet up not found" });
    }
    const updatedMeetups = await Meetup.findOneAndUpdate(
      meetup._id,
      {
        title,
        description,
        date,
        location,
      },
      { new: true }
    );
    res.status(201).json({ message: "Meetup found", updatedMeetups });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
