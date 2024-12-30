const mongoose = require('mongoose');
const Category = require('./category'); 

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
