const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 6,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
