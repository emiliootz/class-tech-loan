// check user role
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

// allow multiple roles
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

module.exports = {
  requireRole,
  requireRoles,
};
