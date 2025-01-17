const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const usersRouter = require('./controllers/users.js');
const profilesRouter = require('./controllers/profiles.js');
const tasksRouter = require('./controllers/tasks.js');
const categoriesRouter = require('./controllers/categories.js');

const app = express();



mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json()); 



app.use('/users', usersRouter);        
app.use('/profiles', profilesRouter);   
app.use('/tasks', tasksRouter);          
app.use('/categories', categoriesRouter);      



app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});




app.listen(process.env.PORT, () => {
  console.log('The express app is ready!');
});
