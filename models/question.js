const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [Number],
    default: [1, 2, 3, 4, 5],
  },
});

module.exports = mongoose.model("Question", questionSchema);
