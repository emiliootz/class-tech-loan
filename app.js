/*****************************
 *       Application         *
 *****************************/
/*
  app.js is the main application file. Here we call all the routes used in /routes
  and sets up the Express application, sets up the session, and starts the server
  any imports are placed under the import section, any routes wihtin the route section
  and use routes under the use routes section. 

*/
/*****************************
 *        Imports            *
 *****************************/
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const config = require("./config/config");
const errorHandler = require("./middleware/errorHandler");

// Database imports to ensure connection & models are set up
require("./config/database"); // This runs the mongoose.connect()

/*****************************
 *        Routes             *
 *****************************/
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const loanRoutes = require("./routes/loanRoutes");
const googleRoutes = require("./routes/googleRoutes");
const cartRoutes = require("./routes/cartRoutes");

/*****************************
 *      Express app Setup    *
 *****************************/
const app = express(); // Initialize Express
app.use(express.static("public")); // Serve static files from /public
app.set("view engine", "jsx"); // Use JSX for views
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json()); // For JSON body parsing
app.use(methodOverride("_method")); // For overriding methods in forms

/*****************************
 *       Session Setup       *
 *****************************/
app.use(
  session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: config.db.mongoUrl,
      collectionName: config.session.collectionName,
    }),
    cookie: { maxAge: config.session.cookieMaxAge },
  })
);

/*****************************
 *      Passport Setup       *
 *****************************/
require("./config/passport"); // Initializes Passport config
app.use(passport.initialize());
app.use(passport.session());

/*****************************
 *      Route Handlers       *
 *****************************/

/**
 *  You can define any helper functions or common logic here.
 */
const { ItemModel, UserModel } = require("./config/database");

// Example helper to fetch items for the homepage
async function fetchItems() {
  try {
    // Fetch only the fields you need
    const fetchedItems = await ItemModel.find(
      {},
      "_id make model assetType status picture"
    ).lean();

    // Transform each item as needed
    return fetchedItems.map((item) => ({
      _id: item._id,
      label: `${item.make} ${item.model}`,
      picture: item.picture || "placeholder-image.png",
      status: item.status,
      assetType: item.assetType,
    }));
  } catch (err) {
    console.error("Error fetching items:", err);
    return [];
  }
}

/*****************************
 *       Main Routes         *
 *****************************/
app.get("/", async (req, res, next) => {
  try {
    const items = await fetchItems();

    // If user is logged in, you may want cartCount or other data
    const isLoggedIn = req.isAuthenticated && req.isAuthenticated();
    let cartCount = 0;
    if (isLoggedIn && req.user) {
      const user = await UserModel.findById(req.user._id).populate("cart");
      cartCount = user.cart.length;
    }

    res.render("index", {
      items,
      isLoggedIn,
      cartCount,
    });
  } catch (error) {
    next(error);
  }
});

/*****************************
 *       Use Other Routes    *
 *****************************/
app.use("/", userRoutes);
app.use("/", itemRoutes);
app.use("/", loanRoutes);
app.use("/", cartRoutes);
app.use("/", googleRoutes);

/*****************************
 *     Fallback 404 Route    *
 *****************************/
// If no routes above match, this handles the request:
app.use("*", async (req, res, next) => {
  try {
    const isLoggedIn = req.isAuthenticated && req.isAuthenticated();
    let cartCount = 0;

    if (isLoggedIn && req.user) {
      const user = await UserModel.findById(req.user._id).populate("cart");
      cartCount = user.cart.length;
    }

    return res.status(404).render("404", {
      isLoggedIn,
      cartCount,
    });
  } catch (error) {
    // If something goes wrong while rendering 404, pass it to our global error handler
    next(error);
  }
});

/*****************************
 *   Global Error Handler    *
 *****************************/
app.use(errorHandler);

/*****************************
 *       Start Server        *
 *****************************/
app.listen(config.app.port, () => {
  console.log(`Listening on port ${config.app.port}`);
});
