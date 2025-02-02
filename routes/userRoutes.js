/*****************************
 *       User Route          *
 *****************************/
/*
  Within this file are all the routes for user management.

  In app.js, this file is imported using:
    const userRoutes = require("./routes/userRoutes");
  and used as:
    app.use("/", userRoutes);

  The routes will use:
    req: to request data
    res: to render data to the page
    next: to pass any errors to the error handler middleware
*/

/*****************************
 *        Imports            *
 *****************************/
const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const { UserModel, ItemModel } = require("../config/database");
const { isAuthenticated, requireRole } = require("../middleware/auth");
const router = express.Router();

// Debug print to console Authentication status
console.log("Debug - isAuthenticated:", isAuthenticated);

/*****************************
 *       Admin Role          *
 *****************************/
/*
  The following management routes require admin status. The admin can
  assign roles to users, disable users, delete users, and view the admin page.
*/

/*
  Route to assign a role to an existing user using their userId.
  Roles can be set to "user", "staff", or "admin".
*/
router.put(
  "/assign-role/:userId",
  requireRole("admin"),
  validateObjectId("userId"),
  async (req, res, next) => {
    const userId = req.params.userId;
    const { role } = req.body;

    if (!["user", "staff", "admin"].includes(role)) {
      const error = new Error("Invalid role");
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
  Route to render the admin settings page. This page allows the admin to manage users and items.
*/
router.get("/admin", requireRole("admin"), async (req, res, next) => {
  try {
    const activeTab = req.query.tab || "users";
    const users = activeTab === "users" ? await UserModel.find().lean() : [];
    const items = activeTab === "items" ? await ItemModel.find().lean() : [];
    const cartCount = req.user.cart?.length || 0;
    const isLoggedIn = req.isAuthenticated();
    const isAdmin = req.user.role === "admin";

    res.render("adminJSX", {
      activeTab,
      users,
      items,
      cartCount,
      isLoggedIn,
      isAdmin,
    });
  } catch (error) {
    next(error);
  }
});

/*****************************
 *       Manage Users        *
 *****************************/

/*
  Update a user's role via the admin panel.
*/
router.put(
  "/admin/users/:id",
  requireRole("admin"),
  validateObjectId("id"),
  async (req, res, next) => {
    const userId = req.params.id;
    const { role } = req.body;

    if (!["user", "staff", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role selection." });
    }

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res
        .status(200)
        .json({ message: "User role updated successfully", user: updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

/*
  Disable a user to prevent login.
  Note: Ensure the User schema includes a "disabled" field.
*/
router.put(
  "/admin/users/disable/:id",
  requireRole("admin"),
  validateObjectId("id"),
  async (req, res, next) => {
    const userId = req.params.id;

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { disabled: true },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res
        .status(200)
        .json({ message: "User disabled successfully", user: updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

/*
  Completely delete a user from the database.
*/
router.delete(
  "/admin/users/:id",
  requireRole("admin"),
  validateObjectId("id"),
  async (req, res, next) => {
    const userId = req.params.id;

    try {
      const deletedUser = await UserModel.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
);

/*****************************
 *       Staff Role          *
 *****************************/
/*
  Additional routes for users with the staff or admin role can be added here.
*/

/*****************************
 *   Redirect `/protected`   *
 *****************************/
/*
  Redirects requests to "/protected" to the home page.
*/
router.get("/protected", (req, res) => {
  res.redirect("/");
});

module.exports = router;
