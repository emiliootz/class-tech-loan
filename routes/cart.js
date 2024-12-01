/**
 * This file contains all routes related to managing the user's cart.
 */

const express = require("express");
const router = express.Router();
const { UserModel, ItemModel, LoanModel } = require("../config/database");
const mongoose = require("mongoose");

// Add an item to the user's cart
router.post("/add-to-cart/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  if (!req.isAuthenticated()) {
    return res.status(401).send({ msg: "Unauthorized" });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).send({ error: "Invalid itemId" });
    }
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const item = await ItemModel.findById(itemId);
    if (!item || item.status !== "Available") {
      return res.status(400).send({ error: "Item is not available" });
    }

    // Add item to cart
    user.cart.push(itemId);
    await user.save();

    res.status(200).send({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// View items in the user's cart
router.get("/view-cart", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({ msg: "Unauthorized" });
  }

  try {
    const user = await UserModel.findById(req.user._id).populate("cart");
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ cart: user.cart });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Remove an item from the user's cart
router.delete("/remove-from-cart/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  if (!req.isAuthenticated()) {
    return res.status(401).send({ msg: "Unauthorized" });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).send({ error: "Invalid itemId" });
    }

    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    user.cart = user.cart.filter((item) => item.toString() !== itemId);
    await user.save();

    res
      .status(200)
      .send({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Checkout the user's cart
router.post("/checkout-cart", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({ msg: "Unauthorized" });
  }

  try {
    const user = await UserModel.findById(req.user._id).populate("cart");
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    for (const item of user.cart) {
      if (item.status !== "Available") {
        return res
          .status(400)
          .send({ error: `Item ${item.assetId} is no longer available` });
      }
    }

    // Create loan records and update item status
    for (const item of user.cart) {
      item.status = "Assigned To Location";
      await item.save();

      const newLoan = new LoanModel({
        userId: user._id,
        itemId: item._id,
        status: "Assigned to Location",
        location: "N/A",
      });
      await newLoan.save();
    }

    // Clear the user's cart
    user.cart = [];
    await user.save();

    res.status(200).send({ message: "Checkout successful" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
