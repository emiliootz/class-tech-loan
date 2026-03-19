// controllers/loanController.js

const mongoose = require("mongoose");
const { LoanModel, ItemModel } = require("../config/database");

/**
 * Render the staff loan management page with all active loans.
 */
exports.getAllLoans = async (req, res, next) => {
  try {
    const loans = await LoanModel.find()
      .populate("userId", "name email")
      .populate("itemId", "make model assetId picture")
      .lean();

    const isLoggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
    const isAdmin = req.user?.role === "admin";
    const isStaff = req.user?.role === "staff" || isAdmin;
    const cartCount = req.user?.cart?.length || 0;

    const flash = {
      success: req.flash("success"),
      error: req.flash("error"),
    };

    res.render("loaned-items", { loans, isLoggedIn, isAdmin, isStaff, cartCount, flash });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific loan by its itemId (JSON — for API use).
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
    res.status(200).json({ message: "Loan updated successfully", loan: updatedLoan });
  } catch (error) {
    next(error);
  }
};

/**
 * Manually add a new loan (staff/admin).
 */
exports.addLoan = async (req, res, next) => {
  const { userId, itemId, arrivalTime, returnTime } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(itemId)
  ) {
    const error = new Error("Invalid userId or itemId");
    error.status = 400;
    return next(error);
  }

  if (!arrivalTime || !returnTime) {
    const error = new Error("Arrival time and return time are required");
    error.status = 400;
    return next(error);
  }

  try {
    const newLoan = new LoanModel({ userId, itemId, arrivalTime, returnTime });
    await newLoan.save();
    res.status(201).json({ message: "Loan added successfully", loan: newLoan });
  } catch (error) {
    next(error);
  }
};

/**
 * Mark an item as returned: set item status back to Available, delete the loan record.
 */
exports.returnItem = async (req, res, next) => {
  const { loanId } = req.params;
  try {
    const loan = await LoanModel.findById(loanId);
    if (!loan) {
      const error = new Error("Loan not found");
      error.status = 404;
      return next(error);
    }

    await ItemModel.findByIdAndUpdate(loan.itemId, { status: "Available" });
    await LoanModel.findByIdAndDelete(loanId);

    req.flash("success", "Item marked as returned.");
    res.redirect("/loaned-items");
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a loan record by its itemId.
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
