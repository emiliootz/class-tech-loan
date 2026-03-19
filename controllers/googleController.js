const passport = require("passport");
const UserModel = require("../config/database");

const LOGIN_ROUTE = "/";
const PROTECTED_ROUTE = "/protected";
const LOGOUT_ROUTE = "/";

/**
 * Initiates Google authentication.
 */
exports.googleAuth = (req, res, next) => {
  return passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
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
    req.session.destroy(() => {
      res.redirect(LOGOUT_ROUTE);
    });
  });
};
