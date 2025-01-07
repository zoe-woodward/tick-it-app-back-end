const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Task = require('../models/task.js');
const router = express.Router();

// ========== Public Routes =========

// ========= Protected Routes =========

router.use(verifyToken);

router.post('/', async (req, res) => {
  try {
    const { name, dueDate, category } = req.body;
    const userId = req.user._id; 

    const newTask = new Task({
      name,
      dueDate,
      category,
      user: userId, 
    });

    await newTask.save();
    res.status(201).json(newTask); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }); 
    res.status(200).json(tasks); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.status(200).json(task); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    task.name = req.body.name || task.name;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.category = req.body.category || task.category;

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:taskId',  async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await task.remove(); 
    res.status(200).json({ message: 'Task deleted successfully' }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;

