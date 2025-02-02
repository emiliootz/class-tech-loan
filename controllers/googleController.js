// controllers/googleController.js

const passport = require("passport");

// You can keep these constants here or import them from a config file
const LOGIN_ROUTE = "/login";
const PROTECTED_ROUTE = "/protected";
const LOGOUT_ROUTE = "/";

/**
 * Initiates Google authentication.
 */
exports.googleAuth = (req, res, next) => {
  // Invoke the Passport Google strategy middleware
  passport.authenticate("google", { scope: ["profile"] })(req, res, next);
};

/**
 * Handles the Google authentication callback.
 */
exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: LOGIN_ROUTE,
    successRedirect: PROTECTED_ROUTE,
  })(req, res, next);
};

/**
 * Logs the user out.
 */
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(LOGOUT_ROUTE);
  });
};
