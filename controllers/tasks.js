const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Task = require('../models/task.js');
const router = express.Router();

// ========== Public Routes =========

// ========= Protected Routes =========

router.use(verifyToken);

router.post('/', async (req, res) => {
  try {
    const { name, dueDate, category, isCompleted } = req.body;
    const userId = req.user._id; 

    const newTask = new Task({
      name,
      dueDate,
      category,
      isCompleted,
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
    const task = await Task.findById(req.params.taskId).populate("category");
    console.log(task);
    res.status(200).json(task); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorised' });
    }

    task.name = req.body.name || task.name;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.category = req.body.category || task.category;
    task.isCompleted = req.body.isCompleted || task.isCompleted;

    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:taskId',  async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorised' });
    }

    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json(error);
  }
});




module.exports = router;

