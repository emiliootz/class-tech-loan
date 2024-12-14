const express = require("express");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const config = require("./config/config");
const errorHandler = require("./middleware/errorHandler");

// Import routes
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const loanRoutes = require("./routes/loanRoutes");
const googleRoutes = require("./routes/googleRoutes");

/*****************************
 *     Middleware Setup      *
 *****************************/

const { requireRole, requireRoles } = require("./middleware/auth"); // required role setup

/*****************************
 *        Model Setup        *
 *****************************/

const { UserModel, ItemModel, LoanModel } = require("./config/database");

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

/*****************************/

/*****************************
 *      Passport Setup       *
 *****************************/

require("./config/passport"); // Use passport.js in config directory

app.use(passport.initialize());
app.use(passport.session());

/*****************************/

// Use routes
app.use("/", userRoutes);
app.use("/", itemRoutes);
app.use("/", loanRoutes);
app.use("/", googleRoutes);

// Error handling
app.use(errorHandler);

/*****************************
 *       Start Server        *
 *****************************/

// Starting the server using the port in config.js
app.listen(config.app.port, () => {
  console.log(`Listening on port ${config.app.port}`); // Use backticks for proper string interpolation
});

/*****************************/
