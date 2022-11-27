const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return v >= 2 && v <= 30;
      },
      message: "Name must be more than 2 and less than 30 characters",
    },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return v >= 2 && v <= 30;
      },
      message: "Description must be more than 2 and less than 30 characters",
    },
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
