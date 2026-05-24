const { Schema, model } = require("mongoose");

const todoModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Todo = model("Todo", todoModel);

module.exports = Todo;
