/*****************************
 *        Cart Route         *
 *****************************/
/*
  Within this file is all the routes for the user's cart. Any additional
  routes that have to do with the cart go within this file.

  In app.js this is imported using: 
    const cartRoutes = require("./routes/cartRoutes");
  and then used as:
    app.use("/", cartRoutes);

  The routes will use:
    req: to request data
    res: to render data to the page
    next: to pass an error to the error handler middleware
*/

/*****************************
 *        Imports            *
 *****************************/
const express = require("express");
const { UserModel, ItemModel } = require("../config/database");
const { isAuthenticated } = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();

/*****************************
 *        Users Cart         *
 *****************************/

/*
 * This route handles the display of the user's cart. It fetches the user
 * by their ID (populating the cart) and then renders the "cart" view with
 * details such as the items in the cart and the count.
 */
router.get("/cart", isAuthenticated, async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id).populate("cart");
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    const cartItems = user.cart;
    const cartCount = cartItems.length;
    const isLoggedIn = req.isAuthenticated();

    res.render("cart", {
      cartItems,
      cartCount,
      isLoggedIn,
      // These functions help generate URLs in the view
      handleDelete: (itemId) => `/remove-from-cart/${itemId}`,
      handleCheckout: "/checkout-cart",
    });
  } catch (error) {
    return next(error);
  }
});

/*****************************
 *            Add            *
 *****************************/

/*
 * This route adds an item to the user's cart. It validates the itemId using
 * the validateObjectId middleware, then checks if the item is already in the cart,
 * verifies the item is available, and finally adds the item to the cart.
 */
router.post(
  "/add-to-cart/:itemId",
  isAuthenticated,
  validateObjectId("itemId"),
  async (req, res, next) => {
    const itemId = req.params.itemId;

    try {
      const user = await UserModel.findById(req.user._id);
      if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        return next(error);
      }

      const alreadyInCart = user.cart.some(
        (id) => id.toString() === itemId.toString()
      );
      if (alreadyInCart) {
        const error = new Error("Item is already in the cart");
        error.status = 400;
        return next(error);
      }

      const item = await ItemModel.findById(itemId);
      if (!item || item.status !== "Available") {
        const error = new Error("Item is not available");
        error.status = 400;
        return next(error);
      }

      user.cart.push(itemId);
      await user.save();

      res.redirect("/protected");
    } catch (error) {
      return next(error);
    }
  }
);

/*****************************
 *         Remove            *
 *****************************/

/*
 * This route removes an item from the user's cart. The itemId parameter is
 * validated using the validateObjectId middleware. The route filters the cart
 * to remove the specified item and then saves the updated user.
 */
router.delete(
  "/remove-from-cart/:itemId",
  isAuthenticated,
  validateObjectId("itemId"),
  async (req, res, next) => {
    const itemId = req.params.itemId;

    try {
      const user = await UserModel.findById(req.user._id);
      if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        return next(error);
      }

      user.cart = user.cart.filter((id) => id.toString() !== itemId);
      await user.save();

      console.log(`Item ${itemId} removed from cart`);
      res.redirect("/cart");
    } catch (error) {
      return next(error);
    }
  }
);

/*****************************
 *         Checkout          *
 *****************************/

/*
 * This route processes the checkout for the user's cart. It retrieves the
 * user's cart (populated with item details), updates each item's status to "Loaned",
 * clears the cart, and then redirects the user to a checkout success page.
 */
router.post("/checkout-cart", isAuthenticated, async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id).populate("cart");
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    for (const item of user.cart) {
      const dbItem = await ItemModel.findById(item._id);
      if (!dbItem) {
        const error = new Error(`Item ${item.assetId} not found`);
        error.status = 404;
        return next(error);
      }
      dbItem.status = "Loaned";
      await dbItem.save();
    }

    user.cart = [];
    await user.save();

    res.redirect("/checkout-success");
  } catch (error) {
    return next(error);
  }
});

/*****************************
 *     Checkout Success      *
 *****************************/

/*
 * This route renders a checkout success page. It checks the user's authentication
 * status and retrieves the cart count (if the user is logged in) before rendering
 * the success view.
 */
router.get("/checkout-success", async (req, res, next) => {
  try {
    const isLoggedIn = req.isAuthenticated && req.isAuthenticated();
    let cartCount = 0;

    if (isLoggedIn && req.user) {
      const user = await UserModel.findById(req.user._id).populate("cart");
      if (user) {
        cartCount = user.cart.length;
      }
    }

    res.render("checkout", {
      name: req.user ? req.user.name : "Guest",
      message: "Getting your items ready for pickup!",
      isLoggedIn,
      cartCount,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
