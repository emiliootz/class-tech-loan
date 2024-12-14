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
      if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(400).send({ error: "Invalid itemId" });
      }
      const items = await LoanModel.find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).send({ error: error.message });
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
      return res.status(404).send({ error: "Loan not found" });
    }
    res
      .status(200)
      .send({ message: "Loan updated successfully", loan: updatedLoan });
  } catch (error) {
    res.status(400).send({ error: error.message });
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
      return res.status(400).send({ error: "Invalid userId or itemId" });
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
    res.status(400).send({ error: error.message });
  }
});

/*
   Delete a loan from the database by item ID
*/
router.delete("/delete-loan/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  try {
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).send({ error: "Invalid itemId" });
    }
    const deletedLoan = await LoanModel.findOneAndDelete({ itemId });
    if (!deletedLoan) {
      return res.status(404).send({ error: "Loan not found" });
    }
    res.status(200).send({ message: "Loan deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
