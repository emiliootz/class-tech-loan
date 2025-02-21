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
const { isAuthenticated, requireRole } = require("../middleware/auth");
const userController = require("../controllers/userController");
const router = express.Router();

// Optional debug print
console.log("Debug - isAuthenticated:", isAuthenticated);

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

router.post("/users/add", userController.addUser);

/*****************************
 *       Staff Role          *
 *****************************/
// Dashboard route
router.get("/dashboard", userController.dashboardPage);

/*****************************
 *   Redirect `/protected`   *
 *****************************/
/**
 * Redirect /protected to the home page.
 */
router.get("/protected", userController.redirectProtected);

module.exports = router;
