/*****************************
 *       Database Setup      *
 *****************************/

/*
  This is the setup for the MongoDB.  

*/


const config = require('./config'); // Import config.js
const mongoose = require('mongoose');

mongoose.connect(config.db.mongoUrl) // Using the URL set in config.js
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Import and export models
const UserModel = require('../models/User');
const ItemModel = require('../models/Item');
const LoanModel = require('../models/Loan');

// Export models
module.exports = {
  UserModel,
  ItemModel,
  LoanModel,
};
