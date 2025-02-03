// controllers/cartController.js
const { UserModel, ItemModel } = require("../config/database");

/**
 * Display the user's cart.
 */
exports.getCart = async (req, res, next) => {
  try {
    let cartItems = [];
    const isLoggedIn = req.isAuthenticated && req.isAuthenticated();
    let cartCount = 0;
    let isAdmin = false;
    if (isLoggedIn && req.user) {
      const user = await UserModel.findById(req.user._id).populate("cart");
      cartItems = user.cart;
      cartCount = user.cart.length;
      isAdmin = user.role === "admin";
    }
    res.render("cart", { cartItems, isLoggedIn, cartCount, isAdmin });
  } catch (error) {
    next(error);
  }
};

/**
 * Add an item to the user's cart.
 */
exports.addToCart = async (req, res, next) => {
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
    next(error);
  }
};

/**
 * Remove an item from the user's cart.
 */
exports.removeFromCart = async (req, res, next) => {
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
    next(error);
  }
};

/**
 * Process the checkout for the user's cart.
 */
exports.checkoutCart = async (req, res, next) => {
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
    next(error);
  }
};

/**
 * Display the checkout success page.
 */
exports.getCheckoutSuccess = async (req, res, next) => {
  try {
    const isLoggedIn = req.isAuthenticated && req.isAuthenticated();
    let cartCount = 0;
    let isAdmin = false;
    let userName = "Guest";
    if (isLoggedIn && req.user) {
      const user = await UserModel.findById(req.user._id).populate("cart");
      cartCount = user.cart.length;
      isAdmin = user.role === "admin";
      userName = user.name;
    }
    res.render("checkout", {
      name: userName,
      isLoggedIn,
      cartCount,
      isAdmin,
      message: "Your items are ready for pickup!",
    });
  } catch (error) {
    next(error);
  }
};
