const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must provide title"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Must provide description"],
    trim: true,
  },
  imgUrl: {
    type: String,
    required: [true, "Must Provide image link."],
    trim: true,
  },
  completed: { type: Boolean, default: false },
  createdAt: { type: String },
});

const NewsModel = mongoose.model("News", TaskSchema);

module.exports = NewsModel;
