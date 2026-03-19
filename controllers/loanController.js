// controllers/loanController.js

const mongoose = require("mongoose");
const { LoanModel } = require("../config/database");

/**
 * Get all loaned items.
 * Accessible only by staff and admin.
 */
exports.getAllLoans = async (req, res, next) => {
  try {
    const loans = await LoanModel.find();
    res.status(200).json(loans);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific loan by its itemId.
 * Accessible only by staff and admin.
 */
exports.getLoanByItemId = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const loan = await LoanModel.findOne({ itemId }).exec();
    if (!loan) {
      const error = new Error("Loan not found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(loan);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a loan record by its itemId.
 */
exports.updateLoan = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const updatedLoan = await LoanModel.findOneAndUpdate({ itemId }, req.body, {
      new: true,
    });
    if (!updatedLoan) {
      const error = new Error("Loan not found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({
      message: "Loan updated successfully",
      loan: updatedLoan,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add a new loan.
 * This route expects userId and itemId in the request body.
 */
exports.addLoan = async (req, res, next) => {
  const { userId, itemId, status, location } = req.body;
  const allowedStatuses = ["Available", "Loaned", "Assigned to Location"];

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(itemId)
  ) {
    const error = new Error("Invalid userId or itemId");
    error.status = 400;
    return next(error);
  }

  if (!allowedStatuses.includes(status)) {
    const error = new Error("Invalid status value");
    error.status = 400;
    return next(error);
  }

  if (!location || typeof location !== "string" || location.trim() === "") {
    const error = new Error("Location is required");
    error.status = 400;
    return next(error);
  }

  try {
    const newLoan = new LoanModel({ userId, itemId, status, location: location.trim() });
    await newLoan.save();
    res.status(201).json({
      message: "Loan added successfully",
      loan: newLoan,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a loan by its itemId.
 */
exports.deleteLoan = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const deletedLoan = await LoanModel.findOneAndDelete({ itemId });
    if (!deletedLoan) {
      const error = new Error("Loan not found");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (error) {
    next(error);
  }
};
