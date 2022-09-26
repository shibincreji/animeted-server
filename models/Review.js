const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  desc: {
    type: String,
    minLength: [5, "Description length should be between 5 and 100."],
    maxLength: [100, "Description length should be between 5 and 100."],
    required: [true, "Please provide Description."],
  },
  rating: {
    type: Number,
    min: [1, "Rating should be between 1 and 5."],
    max: [5, "Rating should be between 1 and 5."],
    required: [true, "Please provide Rating."],
  },
  animeId: {
    type: Number,
    required: [true, "Please provide Password."],
  },
  userId: {
    type: mongoose.ObjectId,
    ref: "User",
    required: [true, "Please provide User ID."]
  }
}, {timestamps: true});

module.exports = mongoose.model("Review", reviewSchema);
