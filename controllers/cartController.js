// controllers/cartController.js
const { UserModel, ItemModel, LoanModel } = require("../config/database");

/**
 * Combine today's date with a time string "HH:MM" into a full Date object.
 */
const toDateTime = (timeStr) => {
  const today = new Date();
  const [h, m] = timeStr.split(":").map(Number);
  return new Date(today.getFullYear(), today.getMonth(), today.getDate(), h, m);
};

/**
 * Display the user's cart.
 */
exports.getCart = async (req, res, next) => {
  try {
    let cartItems = [];
    const isLoggedIn = req.isAuthenticated && req.isAuthenticated();
    let cartCount = 0;
    let isAdmin = false;
    let flash = { error: [], success: [] };
    if (isLoggedIn && req.user) {
      const user = await UserModel.findById(req.user._id).populate("cart");
      cartItems = user.cart;
      cartCount = user.cart.length;
      isAdmin = user.role === "admin";
      flash = { error: req.flash("error"), success: req.flash("success") };
    }
    res.render("cart", { cartItems, isLoggedIn, cartCount, isAdmin, flash });
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

    res.redirect("/cart");
  } catch (error) {
    next(error);
  }
};

/**
 * Process the checkout for the user's cart.
 * Re-validates availability at checkout time to prevent double-booking.
 * Creates a Loan record for each item with the chosen pickup/return times.
 */
exports.checkoutCart = async (req, res, next) => {
  try {
    const { arrivalDate, returnDate } = req.body;

    const user = await UserModel.findById(req.user._id).populate("cart");
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    if (!arrivalDate || !returnDate) {
      req.flash("error", "Please select both an arrival time and a return time.");
      return res.redirect("/cart");
    }

    const arrivalTime = toDateTime(arrivalDate);
    const returnTime = toDateTime(returnDate);

    // Re-validate all items are still available before doing anything (race condition fix)
    for (const item of user.cart) {
      const dbItem = await ItemModel.findById(item._id);
      if (!dbItem || dbItem.status !== "Available") {
        req.flash(
          "error",
          `"${item.make} ${item.model}" is no longer available. Please remove it from your cart.`
        );
        return res.redirect("/cart");
      }
    }

    // All items confirmed available — mark loaned and create loan records
    for (const item of user.cart) {
      const dbItem = await ItemModel.findById(item._id);
      dbItem.status = "Loaned";
      await dbItem.save();
      await LoanModel.create({
        userId: user._id,
        itemId: dbItem._id,
        arrivalTime,
        returnTime,
      });
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
      message: "Your items are ready for pickup. You can view your active loans anytime from your account.",
    });
  } catch (error) {
    next(error);
  }
};
