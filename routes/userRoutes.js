/*****************************
 *       User Route          *
 *****************************/
/*
  Within this file is all the routes for users

  within app.js this is imported using : 
  
  const userRoutes = require("./routes/userRoutes");
   and 
  app.use("/", userRoutes);
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
 *        Protected          *
 *****************************/
/*
  The protected route that the application goes to after succsesful login
  isAuthenticated is passed in from /middleware/auth
  and is imported on the top of this page as:
  const { isAuthenticated, requireRole } = require("../middleware/auth");

  The protected route can be edited within /views/protectedJSX.jsx
*/

router.get("/protected", isAuthenticated, async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id).populate("cart");
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    const cartCount = user.cart.length;
    const items = await ItemModel.find();
    const isLoggedIn = req.isAuthenticated();

    res.render("protected", {
      name: req.user.name,
      items,
      cartCount,
      isLoggedIn,
    });
  } catch (error) {
    return next(error);
  }
});

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
router.put("/assign-role/:userId", requireRole("admin"), async (req, res) => {
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
});

/*
  Route to admin page. This page is the admin settings page so they can 
  add items, delete items, add users, and manage users roles.
*/
router.get("/admin", requireRole("admin"), async (req, res) => {
  try {
    const users = await UserModel.find();
    const items = await ItemModel.find();
    res.render("adminJSX", { users, items });
  } catch (error) {
    return next(error);
  }
});

/*****************************
 *       Staff Role          *
 *****************************/
/*
  Here we're going to add some routes that only users with the
  staff or admin role can do.
*/

module.exports = router;
