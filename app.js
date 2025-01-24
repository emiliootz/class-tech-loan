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
const methodOverride = require("method-override"); // Used to override the methods to call POSTS we normally cant call within HTML files
const config = require("./config/config");
const errorHandler = require("./middleware/errorHandler");
const { ItemModel } = require("./config/database");

/*****************************
 *        Routes             *
 *****************************/

/*
  This is the imports for the routes under the /routes directory
  These are used to be able to use route files within this file.
*/

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const loanRoutes = require("./routes/loanRoutes");
const googleRoutes = require("./routes/googleRoutes");
const cartRoutes = require("./routes/cartRoutes");

/*****************************
 *      Express app Setup    *
 *****************************/

const app = express(); // Set express() to a variable named app

app.use(express.static("public"));
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

/*****************************/

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

require("./config/passport"); // Use passport.js in config directory

app.use(passport.initialize());
app.use(passport.session());

/*****************************
 *       Use Routes          *
 *****************************/
/*
  These are to use the routes under the /routes directory
  passing in the imports called in the Routes section. 
  These are used to be able to use route files within this file.
*/

app.use("/", userRoutes);
app.use("/", itemRoutes);
app.use("/", loanRoutes);
app.use("/", cartRoutes);
app.use(errorHandler);

/*****************************
 *       Fetch Items         *
 *****************************/
async function fetchItems() {
  try {
    // 1. Fetch only the fields you need. For example:
    //    _id, make, model, assetType, and status.
    const fetchedItems = await ItemModel.find(
      {},
      "_id make model assetType status"
    ).lean();

    // 2. Transform each item into the shape your front end expects.
    //    Here, we create a 'label' (combining make & model) and
    //    set a placeholder 'picture'.
    return fetchedItems.map((item) => ({
      _id: item._id,
      label: `${item.make} ${item.model}`, // for display text
      picture: item.imageUrl || "placeholder-image.png", // or a real field if you store images
      status: item.status,
      assetType: item.assetType,
    }));
  } catch (err) {
    console.error("Error fetching items:", err);
    return []; // Return an empty array if an error occurs
  }
}

/*****************************
 *       Start Server        *
 *****************************/
app.get("/", async (req, res) => {
  const items = await fetchItems();

  console.log(items);

  res.render("index", { items });
});
/*
  Starting the server the port in config.js which is passing in the 
  port from the port set in the .env file
*/

app.use("/", googleRoutes);

app.listen(config.app.port, () => {
  console.log(`Listening on port ${config.app.port}`);
});
