/*****************************
 *       User Route          *
 *****************************/
/*
  This file defines all routes related to user management.
  In app.js, it is imported as:
    const userRoutes = require("./routes/userRoutes");
    app.use("/", userRoutes);
*/

const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const {
  isAuthenticated,
  requireRole,
  requireRoles,
} = require("../middleware/auth");
const userController = require("../controllers/userController");
const router = express.Router();


/*****************************
 *       Admin Role          *
 *****************************/
/**
 * Assign a role to a user.
 */
router.put(
  "/assign-role/:userId",
  requireRole("admin"),
  validateObjectId("userId"),
  userController.assignRole
);

/**
 * Render the admin page.
 */
router.get("/admin", requireRole("admin"), userController.getAdminPage);

/*****************************
 *       Manage Users        *
 *****************************/
/**
 * Update a user's role via the admin panel.
 */
router.put(
  "/admin/users/:id",
  requireRole("admin"),
  validateObjectId("id"),
  userController.updateUserRole
);

/**
 * Disable a user.
 */
router.put(
  "/admin/users/disable/:id",
  requireRole("admin"),
  validateObjectId("id"),
  userController.disableUser
);

/**
 * Delete a user.
 */
router.delete(
  "/admin/users/:id",
  requireRole("admin"),
  validateObjectId("id"),
  userController.deleteUser
);

router.post("/users/add", requireRole("admin"), userController.addUser);

router.put(
  "/admin/users/phone/:id",
  requireRole("admin"),
  validateObjectId("id"),
  userController.updateUserPhone
);

router.put(
  "/admin/users/update/:id",
  requireRole("admin"),
  validateObjectId("id"),
  userController.updateUserDetails
);

/**
 * Render the User Management page.
 */
router.get(
  "/users",
  isAuthenticated,
  requireRoles(["admin", "staff"]),
  userController.usersPage
);

/**
 * Render the edit page for a specific user.
 */
router.get(
  "/users/:id/edit",
  requireRole("admin"),
  validateObjectId("id"),
  userController.getUserEditPage
);

/**
 * Handle the edit form submission for a specific user.
 */
router.put(
  "/users/:id",
  requireRole("admin"),
  validateObjectId("id"),
  userController.updateUserDetails
);

/*****************************
 *       Staff Role          *
 *****************************/
// Dashboard route
router.get("/dashboard", requireRoles(["staff", "admin"]), userController.dashboardPage);

/*****************************
 *   Redirect `/protected`   *
 *****************************/
/**
 * Redirect /protected to the home page.
 */
router.get("/protected", userController.redirectProtected);

module.exports = router;
