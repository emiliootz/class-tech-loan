/*****************************
 *       Database Setup      *
 *****************************/

/*
  This is the setup for the MongoDB. The models and are imported and the url
  for MongoDB is setup within the config.js file and the .env file

*/

const config = require("./config"); // Import config.js
const mongoose = require("mongoose");

mongoose
  .connect(config.db.mongoUrl) // Using the mongoUrl set in config.js & .env file
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Import and export models saved into the MongoDB server
const UserModel = require("../models/User");
const ItemModel = require("../models/Item");
const LoanModel = require("../models/Loan");

module.exports = {
  UserModel,
  ItemModel,
  LoanModel,
};
