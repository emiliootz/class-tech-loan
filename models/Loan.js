const mongoose = require("mongoose");

const loaningSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  returnTime: {
    type: Date,
    required: true,
  },
  checkedOutAt: {
    type: Date,
    default: Date.now,
  },
});

const LoanModel = mongoose.model("Loans", loaningSchema);

module.exports = LoanModel;
