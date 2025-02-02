const mongoose = require("mongoose");

// Helper function
const getTomorrow = () => new Date(Date.now() + 86400000);

// Lending Schema and Model
const loaningSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
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
    enum: ["Available", "Assigned to Location"],
    required: true,
  },
  location: {
    type: String,
    default: "N/A",
    required: true,
  },
});

const LoanModel = mongoose.model("Loans", loaningSchema);

module.exports = LoanModel;
