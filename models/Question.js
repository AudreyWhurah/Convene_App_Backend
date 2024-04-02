const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  meetup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meetup",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Question", questionSchema);
