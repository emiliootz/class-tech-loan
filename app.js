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
const errorHandler = require("./middleware/errorHandler");
const shuffle = require("./middleware/shuffle");
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

// Example helper imports (if needed)
const { ItemModel, UserModel } = require("./config/database");

/*****************************
 *       Main Routes         *
 *****************************/

// Home route
app.get("/", async (req, res, next) => {
  try {
    const { category } = req.query;
    const PAGE_SIZE = 12;
    const page = Math.max(1, parseInt(req.query.page) || 1);

    const query = category
      ? { assetType: { $regex: new RegExp(category, "i") } }
      : {};

    const [items, totalItems] = await Promise.all([
      ItemModel.find(query).skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE),
      ItemModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalItems / PAGE_SIZE);

    const isLoggedIn = req.isAuthenticated && req.isAuthenticated();
    let cartCount = 0;
    let isAdmin = false;

    if (isLoggedIn && req.user) {
      const user = await UserModel.findById(req.user._id).populate("cart");
      cartCount = user.cart.length;
      isAdmin = user.role === "admin";
    }

    res.render("home", {
      items: shuffle(items),
      isLoggedIn,
      cartCount,
      isAdmin,
      activeCategory: category || null,
      currentPage: page,
      totalPages,
    });
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

// Handle multer errors (invalid file type, file too large) before the generic handler
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    err.status = 400;
    err.message = "Image must be 5 MB or smaller.";
  } else if (err.message && err.message.includes("Only JPEG")) {
    err.status = 400;
  }
  next(err);
});

app.use(errorHandler);

module.exports = app;
