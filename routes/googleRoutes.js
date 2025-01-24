/*****************************
 *          Google           *
 *****************************/
/*
  Within this file is all the routes for Google authentication and login/logout routes

  within app.js this is imported using : 
  
  const googleRoutes = require("./routes/googleRoutes");
   and 
  app.use("/", googleRoutes);

*/

/*****************************
 *        Imports            *
 *****************************/
const express = require("express");
const passport = require("passport");
const router = express.Router();

/*****************************
 *        Constants          *
 *****************************/
const LOGIN_ROUTE = "/login";
const PROTECTED_ROUTE = "/protected";
const LOGOUT_ROUTE = "/";

/*****************************
 *      Authentication       *
 *****************************/
/*
  Authentication routes for Google Authentication 
  failureRedirect is passed in using LOGIN_ROUTE = "/login";
  successRedirect is passed in using PROTECTED_ROUTE = "/protected";
*/

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

/*****************************
 *       Logout Route        *
 *****************************/
/*
  Login route foor loging out of the application and redirecting
  to LOGIN_ROUTE which is the login page.
*/
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(LOGOUT_ROUTE);
  });
});

module.exports = router;
