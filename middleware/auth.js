/*****************************
 *         auth.js           *
 *****************************/

/*
    This file is for the setup of authorization. Below is a setup for the requiredRole, requiredRoles, isAuthenticated functions
    that allow roles to be assigned to users and specific tasks sunch as adding an item to the database (currently
    only and admin can add an item to the database)

*/

/*****************************
 *  Authentication Checker   *
 *****************************/
/*
  Here we're checking if the user is authenticated. If you want to use this within a route 
  use : const {isAuthenticated} = require("../middleware/auth");
  this will allow you to pass in isAuthenticated to check if a user is authenticated to go into
  the protected pages. 

  to call isAuthenticated you can pass it in as a parameter.
  example: router.get("/protected", isAuthenticated, async (req, res) => {}

*/

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/google"); // Send to login if not authenticated
  }
  next(); // Proceed to the next middleware or route handler
};

/*****************************/

/*****************************
 *        Role Checker       *
 *****************************/

/* 
    This is checking which role a user currently has and throws an error if a user is trying to do an action
    that they don't have permission to do (outside of their role).

    to call requireRole you can pass it in as a parameter.
    example: router.post("/add-item", requireRole("admin"), async (req, res) => {}
*/

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send({ msg: "Unauthorized" });
    }
    if (req.user.role !== role) {
      return res
        .status(403)
        .send({ msg: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};
/*****************************/

/*****************************
 *   Multiple Role Checker   *
 *****************************/

/*
    This is checking if a user is authenticated similar to requireRole but is checking if a user has
    multiple roles at the same time

     to call requireRoles you can pass it in as a parameter.
    example: router.get( "/loaned-items/", requireRoles(["staff", "admin"]), async (req, res) => {}
      
  */

const requireRoles = (roles) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send({ msg: "Unauthorized" });
    }
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .send({ msg: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};
/*****************************/

// Export all middleware
module.exports = { isAuthenticated, requireRole, requireRoles };
