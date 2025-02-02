// config/expressMiddleware.js

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");
const config = require("./config");

/**
 * Configures global Express middleware.
 *
 * @param {Object} app - The Express application instance.
 */
module.exports.configureExpressMiddleware = (app) => {
  // Serve static files from the "public" directory
  app.use(express.static("public"));

  // Set up the view engine (using express-react-views)
  app.set("view engine", "jsx");
  app.engine("jsx", require("express-react-views").createEngine());

  // Parse URL-encoded bodies and JSON bodies
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Enable method override to support PUT/DELETE from forms
  app.use(methodOverride("_method"));

  // Session configuration with MongoStore for session persistence
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

  // Initialize Passport and manage sessions
  require("../config/passport"); // Ensure Passport configuration is loaded
  app.use(passport.initialize());
  app.use(passport.session());
};
