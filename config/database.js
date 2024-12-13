// database.js

const config = require('./config'); // Import config.js

const mongoose = require('mongoose');

// Helper function
const getTomorrow = () => new Date(Date.now() + 86400000);

mongoose.connect(config.db.mongoUrl) // Using the URL set in config.js
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
    enum: ['Available', 'Loaned', 'Assigned To Location'],
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

// Lending Schema and Model
const loaningSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    required: true,
  },
  itemId: {
    type: mongoose.ObjectId,
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
    default: getTomorrow,
  },
  status: {
    type: String,
    enum: ['Available', 'Assigned to Location'],
    required: true,
  },
  location: {
    type: String,
    default: 'N/A',
    required: true,
  },
});

const LoanModel = mongoose.model('Loans', loaningSchema);

// Export models
module.exports = {
  UserModel,
  ItemModel,
  LoanModel,
};
