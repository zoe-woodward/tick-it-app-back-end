const express = require('express');
const router = express.Router();

const Task = require('../models/task');


router.post('/', async (req, res) => {
    try {
      // Create a new pet with the data from req.body
      const createdTask = await Task.create(req.body);
      res.status(201).json(createdTask); // 201 Created
    } catch (err) {
        res.status(500).json({ err: err.message });
      }
  });
  
  
  
router.get('/', async (req, res) => {
    try {
      const foundTasks = await Task.find();
      res.status(200).json(foundTasks); 
    } catch (err) {
        res.status(500).json({ err: err.message }); 
      }
  });
  
  router.get('/:taskId', async (req, res) => {
    try {
        const foundTask = await Task.findById(req.params.taskId);
      if (!foundTask) {
      res.status(404);
      throw new Error('Task not found.');
    }
    res.status(200).json(foundTask);
  } catch (err) {
    if (res.statusCode === 404) {
        res.json({ err: err.message });
    } else {
        res.status(500).json({ err: err.message });
      }
    }
  });

  
  router.delete('/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ task: deletedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:taskId', async (req, res) => {
   try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
      new: true,
    });
    if (!updatedTask) {
      res.status(404);
      throw new Error('Task not found.');
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    if (res.statusCode === 404) {
        res.json({ err: err.message });
      } else {
        res.status(500).json({ err: err.message });
      }
    }
  });
  

  
  module.exports = router;