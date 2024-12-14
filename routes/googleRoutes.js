// routes/googleRoutes.js
const express = require("express");
const passport = require("passport");

const router = express.Router();

// Constants
const LOGIN_ROUTE = "/login";
const PROTECTED_ROUTE = "/protected";

// Google authentication routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/callback",
  passport.authenticate("google", {
    failureRedirect: LOGIN_ROUTE,
    successRedirect: PROTECTED_ROUTE,
  })
);

// Login route
router.get("/login", (req, res) => res.render("loginJSX"));

// Logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(LOGIN_ROUTE);
  });
});

module.exports = router;
