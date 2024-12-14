/*****************************
 *        Cart Route         *
 *****************************/
/*
  Within this file is all the routes for the user's cart. Any aditional
  routes that have to do with the cart goes within this file.

  within app.js this is imported using : 
  
  const cartRoutes = require("./routes/cartRoutes");
   and 
  app.use("/", cartRoutes);

*/

/*****************************
 *        Imports            *
 *****************************/
const express = require("express");
const mongoose = require("mongoose");
const { UserModel, ItemModel } = require("../config/database");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

/*****************************
 *        Users Cart         *
 *****************************/

/*
 * This route is for the user's cart. The logic for viewing the items within
  the cart, deleting, and checking out is handled within this route.

  cartItems, checks the cart using the UserModel within /models/User.js 

  handleDelete, deletes items from the cart by itemId passing the logic to
  `/remove-from-cart/${itemId}` within /routes/cartRoutes.js

  handleCheckout, checks out the current items within the cart the logic
  is passed to "/checkout-cart" within /routes/cartRoutes.js

 */

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

/*****************************
 *            Add            *
 *****************************/

/*
 * This route is for adding items to the user's cart. 
   All the logic is handled within this route.

 */

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

/*****************************
 *         Remove            *
 *****************************/

/*
    This route is for removing items from the users cart using the itemId.
    All the logic is handled within this route and passed to handleDelete
    within the cart route.
 */

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

/*****************************
 *         Checkout          *
 *****************************/

/*
    This route is for checking out items from the users cart.
    All the logic is handled within this route and passed to handleCheckout
    within the cart route.
 */

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

    res.redirect("/checkout-success"); // redirect to success page after succsesful checkout
  } catch (error) {
    res.status(500).json({ error: "Failed to checkout cart" });
  }
});

// Success page for checkout
router.get("/checkout-success", (req, res) => {
  res.render("checkoutSuccessJSX", {
    name: req.user ? req.user.name : "Guest",
    message: "Getting your items are ready for pickup!",
  });
});

module.exports = router;
