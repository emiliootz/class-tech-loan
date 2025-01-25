/*****************************
 *       Loan Route          *
 *****************************/
/*
  Within this file is all the routes for loans

  within app.js this is imported using : 
  
  const loanRoutes = require("./routes/loanRoutes");
   and 
  app.use("/", loanRoutes);
*/

/*****************************
 *        Imports            *
 *****************************/
const express = require("express");
const { LoanModel } = require("../config/database");
const { requireRoles } = require("../middleware/auth");
const router = express.Router();

/*****************************
 *       Loan Items          *
 *****************************/
/*
  Routes for Loan Items, Get all loaned items, update loan item.
*/

/*
  Get all loaned items. Only staff and admins can see all loaned items
*/

router.get(
  "/loaned-items/",
  requireRoles(["staff", "admin"]),
  async (req, res) => {
    try {
      const items = await LoanModel.find();
      res.status(200).json(items);
    } catch (error) {
      return next(error);
    }
  }
);

/*
  Get Loan by itemId
*/

router.get(
  "/loaned-items/:itemId",
  requireRoles(["staff", "admin"]),
  async (req, res, next) => {
    const { itemId } = req.params;

    // Check if itemId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      const error = new Error("Invalid itemId");
      error.status = 400;
      return next(error);
    }

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
  Update loaned items by ID
*/

router.put("/update-loan/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const updatedLoan = await LoanModel.findOneAndUpdate({ itemId }, req.body, {
      new: true,
    });
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
});

/*****************************
 *     Add/Delete Loan       *
 *****************************/
/*
   Handling the logic for adding and deleting loans
*/

/*
   Add a new loan to the database
*/
router.post("/add-loan/", async (req, res) => {
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
   Delete a loan from the database by item ID
*/
router.delete("/delete-loan/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  try {
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      const error = new Error("Invalid itemId");
      error.status = 400;
      return next(error);
    }
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
});

module.exports = router;
