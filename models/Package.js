const mongoose = require("mongoose");
const Package = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    description: {
      type: String,
      required: [true, "description is required!"],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      required: [true, "description is required!"],
    },
    duration:{
        type:String
    },
    isApproved:{
        type:Boolean,
        default:false
    }
  },
  {
    timeStamp: true,
  }
);

module.exports = mongoose.model("Package", Package);
