const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true 
  },
  hashedPassword: {
    type: String,
    required: true,
    trim: true
  },
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;
