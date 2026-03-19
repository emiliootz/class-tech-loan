/*****************************
 *       Loan Route          *
 *****************************/
/*
  This file defines all routes related to loans.
  In app.js, it's imported and used as:
    const loanRoutes = require("./routes/loanRoutes");
    app.use("/", loanRoutes);
*/

const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const { requireRoles } = require("../middleware/auth");
const loanController = require("../controllers/loanController");
const router = express.Router();

/*****************************
 *       Loan Items          *
 *****************************/

/**
 * GET /loaned-items/
 * Returns all loaned items.
 * Access restricted to users with "staff" or "admin" roles.
 */
router.get(
  "/loaned-items/",
  requireRoles(["staff", "admin"]),
  loanController.getAllLoans
);

/**
 * GET /loaned-items/:itemId
 * Returns a specific loan by its itemId.
 * Validates the itemId parameter.
 */
router.get(
  "/loaned-items/:itemId",
  requireRoles(["staff", "admin"]),
  validateObjectId("itemId"),
  loanController.getLoanByItemId
);

/**
 * PUT /update-loan/:itemId
 * Updates a loan record by its itemId.
 * Access restricted to users with "staff" or "admin" roles.
 */
router.put(
  "/update-loan/:itemId",
  requireRoles(["staff", "admin"]),
  validateObjectId("itemId"),
  loanController.updateLoan
);

/**
 * POST /add-loan/
 * Adds a new loan.
 * Access restricted to users with "staff" or "admin" roles.
 */
router.post("/add-loan/", requireRoles(["staff", "admin"]), loanController.addLoan);

/**
 * DELETE /delete-loan/:itemId
 * Deletes a loan by its itemId.
 * Access restricted to users with "staff" or "admin" roles.
 */
router.delete(
  "/delete-loan/:itemId",
  requireRoles(["staff", "admin"]),
  validateObjectId("itemId"),
  loanController.deleteLoan
);

module.exports = router;
