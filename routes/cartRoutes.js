/*****************************
 *        Cart Route         *
 *****************************/
/*
  This file contains the routes for the user's cart.
  In app.js, it's imported and used like so:
    const cartRoutes = require("./routes/cartRoutes");
    app.use("/", cartRoutes);
*/

const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const cartController = require("../controllers/cartController");
const router = express.Router();

// Display the user's cart
router.get("/cart", isAuthenticated, cartController.getCart);

// Add an item to the cart (itemId is validated)
router.post(
  "/add-to-cart/:itemId",
  isAuthenticated,
  validateObjectId("itemId"),
  cartController.addToCart
);

// Remove an item from the cart (itemId is validated)
router.delete(
  "/remove-from-cart/:itemId",
  isAuthenticated,
  validateObjectId("itemId"),
  cartController.removeFromCart
);

// Process checkout for the cart
router.post("/checkout-cart", isAuthenticated, cartController.checkoutCart);

// Display checkout success page
router.get("/checkout-success", cartController.getCheckoutSuccess);

module.exports = router;
