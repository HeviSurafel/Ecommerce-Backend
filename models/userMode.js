const mongoose = require("mongoose");
const User = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required!"],
    },
    email: {
      type: String,
      required: [true, "email is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required!"],
    },
    profile: {
      type: String,
      default:"../../client/assets/tegu.jpg",
    },
    role: {
      type: String,
      enum: ["owner","admin", "user"],
      default:"user"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
