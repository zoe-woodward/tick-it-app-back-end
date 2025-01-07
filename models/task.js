const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Personal', 'Work'],
  },
});

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    required: true,
  },

  category: [categorySchema], 
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
