/*****************************
 *       User Route          *
 *****************************/
/*
  Within this file is all the routes for users

  within app.js this is imported using : 
  
  const userRoutes = require("./routes/userRoutes");
   and 
  app.use("/", userRoutes);

  The routes will use:

  req: to request data
  res: to render the data to the page
  next: to pass and error to the error handler middleware
*/

/*****************************
 *        Imports            *
 *****************************/
const express = require("express");
const { UserModel, ItemModel } = require("../config/database");
const { isAuthenticated, requireRole } = require("../middleware/auth");
const router = express.Router();

// Debug print to console Authentication status
console.log("Debug - isAuthenticated:", isAuthenticated);

/*****************************
 *       Admin Role          *
 *****************************/
/*
  This is a few of the management routes that require admin status 
  requireRole is passed in from /middleware/auth
  and is imported on the top of this page as:
  const { isAuthenticated, requireRole } = require("../middleware/auth");
*/

/*
  Route to give the admin the ability to assign existing users roles using their
  userId. The roles can be changed to user, staff, or admin 
*/
router.put(
  "/assign-role/:userId",
  requireRole("admin"),
  async (req, res, next) => {
    const userId = req.params.userId;
    const { role } = req.body;

    if (!["user", "staff", "admin"].includes(role)) {
      const error = new Error("Invalid role");
      error.status = 400;
      return next(error);
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const error = new Error("Invalid userId");
      error.status = 400;
      return next(error);
    }

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      );
      if (!updatedUser) {
        const error = new Error("User not found");
        error.status = 404;
        return next(error);
      }

      res
        .status(200)
        .send({ message: `User role updated to ${role}`, user: updatedUser });
    } catch (error) {
      return next(error);
    }
  }
);

/*
  Route to admin page. This page is the admin settings page so they can 
  add items, delete items, add users, and manage users roles. There are also
  active tabs that fetch all users/ all items. Similar to other pages that have
  the navbar fixed on top it will fetch the users cart count and check if the user
  is logged in
*/
router.get("/admin", requireRole("admin"), async (req, res, next) => {
  try {
    const activeTab = req.query.tab || "users"; // When the page is loaded the deafult tab is users
    const users = activeTab === "users" ? await UserModel.find().lean() : [];
    const items = activeTab === "items" ? await ItemModel.find().lean() : [];
    const cartCount = req.user.cart?.length || 0;
    const isLoggedIn = req.isAuthenticated();

    res.render("adminJSX", {
      activeTab,
      users,
      items,
      cartCount,
      isLoggedIn,
    });
  } catch (error) {
    next(error);
  }
});

/*****************************
 *       Staff Role          *
 *****************************/
/*
  Here we're going to add some routes that only users with the
  staff or admin role can do.
*/

/*****************************
 *       Redirect `/protected` to `/`        *
 *****************************/
router.get("/protected", (req, res) => {
  res.redirect("/");
});

module.exports = router;
