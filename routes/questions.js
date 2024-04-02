const express = require("express");
const Question = require("../models/Question");
const Meetup = require("../models/Meetup");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Post a question to a specific meetup
router.post("/:meetupId", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    const { meetupId } = req.params;
    const user = req.user._id;

    const meetup = await Meetup.findById(meetupId);
    if (!meetup) {
      return res.status(404).json({ error: "Meetup not found" });
    }

    const question = await Question.create({ meetup: meetupId, user, text });
    res.status(201).json({ message: "Question posted successfully", question });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Upvote a question
router.post("/:questionId/upvote", authMiddleware, async (req, res) => {
  try {
    const { questionId } = req.params;
    const question = await Question.findByIdAndUpdate(
      questionId,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    res.json({ message: "Question upvoted successfully", question });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Downvote a question
router.post("/:questionId/downvote", authMiddleware, async (req, res) => {
  try {
    const { questionId } = req.params;
    const question = await Question.findByIdAndUpdate(
      questionId,
      { $inc: { downvotes: 1 } },
      { new: true }
    );
    res.json({ message: "Question downvoted successfully", question });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get questions for a specific meetup sorted by upvotes
router.get("/:meetupId", async (req, res) => {
  try {
    const { meetupId } = req.params;

    const questions = await Question.find({ meetup: meetupId }).sort({
      upvotes: -1,
    });

    res.json({ questions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
