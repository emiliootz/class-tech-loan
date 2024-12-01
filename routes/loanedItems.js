/**
 * This file contains all routes related to managing the items the user
 * wishes to loan or to simply view the currently loaned items.
 */

const express = require("express");
const router = express.Router();

const { LoanModel } = require("../config/database");
const { requireRoles } = require("../config/authMiddleware");
const mongoose = require("mongoose");

// Add a loaned item
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

// Get all loaned items
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

// Update a loaned item by item ID
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

// Delete a loan by item ID
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
