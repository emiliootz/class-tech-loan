/*****************************
 *         auth.js           *
 *****************************/

/*
    This file is for the setup of authorization. Below is a setup for the requiredRole and requiredRoles functions
    that allow roles to be assigned to users and specific tasks sunch as adding an item to the database (currently
    only and admin can add an item to the database)

*/

/*****************************
 *        Role Checker       *
 *****************************/

/* 
    This is checking which role a user currently has and throws an error if a user is trying to do an action
    that they don't have permission to do (outside of their role).
*/

const requireRole = (role) => {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.status(401).send({ msg: "Unauthorized" });
      }
      if (req.user.role !== role) {
        return res.status(403).send({ msg: "Forbidden: Insufficient permissions" });
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
  */

  const requireRoles = (roles) => {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.status(401).send({ msg: "Unauthorized" });
      }
      if (!roles.includes(req.user.role)) {
        return res.status(403).send({ msg: "Forbidden: Insufficient permissions" });
      }
      next();
    };
  };
  /*****************************/


module.exports = { requireRole, requireRoles };