/*****************************
 *       Application         *
 *****************************/
/*
  app.js is the main application file. Here we:
  - Import middleware configuration from config/expressMiddleware.js
  - Mount routes (users, items, loans, cart, auth)
  - Define main routes (like the home route and fallback 404)
  - Set up the global error handler
*/

const express = require("express");
const config = require("./config/config");
const errorHandler = require("./middleware/errorHandler");
const methodOverride = require("method-override");

// Import route modules
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const loanRoutes = require("./routes/loanRoutes");
const googleRoutes = require("./routes/googleRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Initialize Express
const app = express();

// Import our updated middleware configuration and set it up
const { configureExpressMiddleware } = require("./config/expressMiddleware");
configureExpressMiddleware(app);

app.use(methodOverride("_method"));

// Example helper imports (if needed)
const { ItemModel, UserModel } = require("./config/database");

/*****************************
 *       Main Routes         *
 *****************************/

// Home route
app.get("/", async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = category
      ? { assetType: { $regex: new RegExp(category, "i") } }
      : {};
    const items = await ItemModel.find(query);
    const isLoggedIn = req.isAuthenticated && req.isAuthenticated();
    let cartCount = 0;
    let isAdmin = false;

    if (isLoggedIn && req.user) {
      const user = await UserModel.findById(req.user._id).populate("cart");
      cartCount = user.cart.length;
      isAdmin = user.role === "admin";
    }

    res.render("home", { items, isLoggedIn, cartCount, isAdmin, activeCategory: category || null });
  } catch (error) {
    next(error);
  }
});

/*****************************
 *       Mount Routes        *
 *****************************/
app.use("/", userRoutes);
app.use("/", itemRoutes);
app.use("/", loanRoutes);
app.use("/", cartRoutes);
app.use("/", googleRoutes);

/*****************************
 *   Fallback 404 Route      *
 *****************************/
app.use("*", async (req, res, next) => {
  try {
    const isLoggedIn = req.isAuthenticated && req.isAuthenticated();
    let cartCount = 0;
    let isAdmin = false;
    if (isLoggedIn && req.user) {
      const user = await UserModel.findById(req.user._id).populate("cart");
      cartCount = user.cart.length;
      isAdmin = user.role === "admin";
    }
    res.status(404).render("404", { isLoggedIn, cartCount, isAdmin });
  } catch (error) {
    next(error);
  }
});

/*****************************
 *   Global Error Handler    *
 *****************************/
app.use(errorHandler);

module.exports = app;
