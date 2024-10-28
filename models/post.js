const mongoose = require("mongoose");
const Post = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
      
    subDescription: {
      type: String,
      required: [true, "subDescription is required"],
    },

    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    catagory: {
      type: String,
      required: [true, "catagory is required"],
    },
    comment: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("post", Post);
