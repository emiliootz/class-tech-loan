/*****************************
 *          Google           *
 *****************************/
/*
  This file contains all the routes for Google authentication and login/logout.
  In app.js, it's imported as:
    const googleRoutes = require("./routes/googleRoutes");
    app.use("/", googleRoutes);
*/

const express = require("express");
const router = express.Router();
const googleController = require("../controllers/googleController");

// Initiate Google authentication
router.get("/auth/google", googleController.googleAuth);

// Handle the callback from Google
router.get("/auth/callback", googleController.googleAuthCallback);

// Logout route to log out and redirect to the login page
router.get("/logout", googleController.logout);

module.exports = router;
