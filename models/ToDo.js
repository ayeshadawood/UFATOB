const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ToDoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ToDo = mongoose.model("todo", ToDoSchema);
