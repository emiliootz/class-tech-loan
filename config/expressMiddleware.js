// config/expressMiddleware.js

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");
const rateLimit = require("express-rate-limit");
const flash = require("connect-flash");
const config = require("./config");

const isProduction = process.env.NODE_ENV === "production";

// Rate limiter for Google OAuth login — 20 attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many login attempts. Please try again later.",
});

// General API limiter — 200 requests per minute per IP
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

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

  // Apply general rate limiter to all routes
  app.use(generalLimiter);

  // Apply strict rate limiter to auth routes
  app.use("/auth", authLimiter);

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
      cookie: {
        maxAge: config.session.cookieMaxAge,
        httpOnly: true,
        sameSite: "strict",
        // secure should only be true over HTTPS (i.e., in production)
        secure: isProduction,
      },
    })
  );

  // Initialize Passport and manage sessions
  require("../config/passport"); // Ensure Passport configuration is loaded
  app.use(passport.initialize());
  app.use(passport.session());

  // Flash messages (requires session middleware above)
  app.use(flash());
};
