const mongoose = require('mongoose');

// User Schema and Model
const userSchema = mongoose.Schema({
  name: String,
  googleId: String,
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  role: {
    type: String,
    enum: ['user', 'staff', 'admin'],
    default: 'user'
  }
});

const UserModel = mongoose.model('User', userSchema);



module.exports = UserModel;