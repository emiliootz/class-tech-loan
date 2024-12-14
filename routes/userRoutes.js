// routes/userRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const { UserModel, ItemModel } = require("../config/database");
const { requireRole } = require("../middleware/auth");
const passport = require("passport");

const router = express.Router();

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({ msg: "Unauthorized" });
  }
  next();
};

// Protected route
router.get("/protected", isAuthenticated, async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.render("protectedJSX", {
      name: req.user.name,
      items,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// User's cart route
router.get("/cart", isAuthenticated, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).populate("cart");
    if (!user) return res.status(404).send({ error: "User not found" });

    res.render("cartJSX", {
      cartItems: user.cart,
      handleDelete: (itemId) => `/remove-from-cart/${itemId}`,
      handleCheckout: "/checkout-cart",
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Add an item to the user's cart
router.post("/add-to-cart/:itemId", isAuthenticated, async (req, res) => {
  const itemId = req.params.itemId;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({ error: "Invalid itemId" });
  }

  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) return res.status(404).send({ error: "User not found" });

    const item = await ItemModel.findById(itemId);
    if (!item || item.status !== "Available") {
      return res.status(400).send({ error: "Item is not available" });
    }

    user.cart.push(itemId);
    await user.save();

    res.status(200).send({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Remove an item from the user's cart
router.delete(
  "/remove-from-cart/:itemId",
  isAuthenticated,
  async (req, res) => {
    const itemId = req.params.itemId;

    try {
      const user = await UserModel.findById(req.user._id);
      if (!user) return res.status(404).send({ error: "User not found" });

      user.cart = user.cart.filter((id) => id.toString() !== itemId);
      await user.save();

      console.log(`Item ${itemId} removed from cart`);
      res.redirect("/cart");
    } catch (error) {
      res.status(500).json({ error: "Failed to remove item from cart" });
    }
  }
);

// Checkout the user's cart
router.post("/checkout-cart", isAuthenticated, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).populate("cart");
    if (!user) return res.status(404).json({ error: "User not found" });

    for (const item of user.cart) {
      const dbItem = await ItemModel.findById(item._id);
      if (!dbItem) {
        return res
          .status(404)
          .json({ error: `Item ${item.assetId} not found` });
      }
      dbItem.status = "Loaned";
      await dbItem.save();
    }

    user.cart = [];
    await user.save();

    res.redirect("/checkout-success");
  } catch (error) {
    res.status(500).json({ error: "Failed to checkout cart" });
  }
});

// Success page for checkout
router.get("/checkout-success", (req, res) => {
  res.render("checkoutSuccessJSX", {
    name: req.user ? req.user.name : "Guest",
    message: "Your items are ready for pickup!",
  });
});

// Manage user roles
router.put("/assign-role/:userId", requireRole("admin"), async (req, res) => {
  const userId = req.params.userId;
  const { role } = req.body;

  if (!["user", "staff", "admin"].includes(role)) {
    return res.status(400).send({ error: "Invalid role" });
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );
    if (!updatedUser) return res.status(404).send({ error: "User not found" });

    res
      .status(200)
      .send({ message: `User role updated to ${role}`, user: updatedUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Admin page
router.get("/admin", requireRole("admin"), async (req, res) => {
  try {
    const users = await UserModel.find();
    const items = await ItemModel.find();
    res.render("adminJSX", { users, items });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
