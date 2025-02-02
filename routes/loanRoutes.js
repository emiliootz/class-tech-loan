/*****************************
 *       Loan Route          *
 *****************************/
/*
  Within this file is all the routes for loans.

  In app.js this file is imported using:
    const loanRoutes = require("./routes/loanRoutes");
  and used as:
    app.use("/", loanRoutes);

  The routes use:
    req: to request data
    res: to render data to the page
    next: to pass errors to the error handler middleware
*/

/*****************************
 *        Imports            *
 *****************************/
const express = require("express");
const mongoose = require("mongoose"); // Ensure mongoose is imported
const validateObjectId = require("../middleware/validateObjectId");
const { LoanModel } = require("../config/database");
const { requireRoles } = require("../middleware/auth");
const router = express.Router();

/*****************************
 *       Loan Items          *
 *****************************/
/*
  Routes for handling loan items: retrieving, updating, adding, and deleting loans.
*/

/*
  Get all loaned items.
  Only users with the staff or admin roles can access this route.
*/
router.get(
  "/loaned-items/",
  requireRoles(["staff", "admin"]),
  async (req, res, next) => {
    try {
      const items = await LoanModel.find();
      res.status(200).json(items);
    } catch (error) {
      return next(error);
    }
  }
);

/*
  Get a specific loan by itemId.
  The validateObjectId middleware ensures the itemId URL parameter is valid.
*/
router.get(
  "/loaned-items/:itemId",
  requireRoles(["staff", "admin"]),
  validateObjectId("itemId"),
  async (req, res, next) => {
    const { itemId } = req.params;
    try {
      const loan = await LoanModel.findOne({ itemId }).exec();
      if (!loan) {
        const error = new Error("Loan not found");
        error.status = 404;
        return next(error);
      }
      return res.status(200).json(loan);
    } catch (error) {
      return next(error);
    }
  }
);

/*
  Update a loan record by itemId.
  The validateObjectId middleware validates the itemId parameter.
*/
router.put(
  "/update-loan/:itemId",
  validateObjectId("itemId"),
  async (req, res, next) => {
    const itemId = req.params.itemId;
    try {
      const updatedLoan = await LoanModel.findOneAndUpdate(
        { itemId },
        req.body,
        { new: true }
      );
      if (!updatedLoan) {
        const error = new Error("Loan not found");
        error.status = 404;
        return next(error);
      }
      res
        .status(200)
        .send({ message: "Loan updated successfully", loan: updatedLoan });
    } catch (error) {
      return next(error);
    }
  }
);

/*****************************
 *     Add/Delete Loan       *
 *****************************/
/*
  Routes for adding and deleting loans.
*/

/*
  Add a new loan to the database.
  Note: Since userId and itemId are sent in the request body rather than as URL parameters,
  inline validation using mongoose.Types.ObjectId.isValid remains.
*/
router.post("/add-loan/", async (req, res, next) => {
  const { userId, itemId, status, location } = req.body;
  try {
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(itemId)
    ) {
      const error = new Error("Invalid userId or itemId");
      error.status = 400;
      return next(error);
    }
    const newLoan = new LoanModel({
      userId,
      itemId,
      status,
      location,
    });
    await newLoan.save();
    res.status(201).send({ message: "Loan added successfully", loan: newLoan });
  } catch (error) {
    return next(error);
  }
});

/*
  Delete a loan from the database by itemId.
  The validateObjectId middleware ensures the itemId parameter is valid.
*/
router.delete(
  "/delete-loan/:itemId",
  validateObjectId("itemId"),
  async (req, res, next) => {
    const itemId = req.params.itemId;
    try {
      const deletedLoan = await LoanModel.findOneAndDelete({ itemId });
      if (!deletedLoan) {
        const error = new Error("Loan not found");
        error.status = 404;
        return next(error);
      }
      res.status(200).send({ message: "Loan deleted successfully" });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
