const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();




const testJWTRouter = require('./controllers/test-jwt.js');
const usersRouter = require('./controllers/users.js');
const profilesRouter = require('./controllers/profiles.js');
const taskRouter = require('./controllers/tasks.js');

const app = express();



mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json()); 



app.use('/test-jwt', testJWTRouter);
app.use('/users', usersRouter);        
app.use('/profiles', profilesRouter);   
app.use('/tasks', taskRouter);          



app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});




app.listen(3000, () => {
  console.log('The express app is ready!');
});
