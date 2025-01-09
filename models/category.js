const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
      type: String,
      required: true,
      enum: ['Personal', 'Work', 'Study'],
    },
  });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;