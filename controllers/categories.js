const express = require('express');
const Category = require('../models/category');  
const router = express.Router();


router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();  
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;