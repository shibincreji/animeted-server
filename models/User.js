const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: [3, "Username length should be between 3 and 10."],
    maxLength: [10, "Username length should be between 3 and 10."],
    required: [true, "Please provide Username."],
    unique: [true, "This Username is already used."],
  },
  email: {
    type: String,
    minLength: [5, "Email length should be between 5 and 30."],
    maxLength: [30, "Email length should be between 5 and 30."],
    required: [true, "Please provide Email."],
    unique: [true, "This Email is already used."],
  },
  password: {
    type: String,
    minLength: [20, "Password cannot be less than 20 characters."],
    required: [true, "Please provide Password."],
  },
});

module.exports = mongoose.model("User", userSchema);
