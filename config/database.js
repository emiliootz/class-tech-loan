// database.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/faculty-tech-lending')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// User Schema and Model
const userSchema = mongoose.Schema({
  name: String,
  googleId: String,
});

const UserModel = mongoose.model('User', userSchema);

// Item Schema and Model
const itemSchema = new mongoose.Schema({
  assetId: {
    type: String,
    required: true,
    unique: true,
  },
  assetType: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    default: 'N/A',
  },
  umbTagNumber: {
    type: String,
    default: 'N/A',
  },
  description: {
    type: String,
    default: 'No description available',
  },
  status: {
    type: String,
    enum: ['Available', 'Assigned To Location'],
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

const ItemModel = mongoose.model('Item', itemSchema);

// Export models
module.exports = {
  UserModel,
  ItemModel,
};
