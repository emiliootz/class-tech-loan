// routes/userRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const { UserModel, ItemModel } = require("../config/database");
const {
  isAuthenticated,
  requireRole,
  requireRoles,
} = require("../middleware/auth");
const passport = require("passport");

const router = express.Router();

console.log("isAuthenticated:", isAuthenticated);

// Protected route
router.get("/protected", isAuthenticated, async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.render("protectedJSX", {
      name: req.user.name,
      items,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Manage user roles
router.put("/assign-role/:userId", requireRole("admin"), async (req, res) => {
  const userId = req.params.userId;
  const { role } = req.body;

  if (!["user", "staff", "admin"].includes(role)) {
    return res.status(400).send({ error: "Invalid role" });
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );
    if (!updatedUser) return res.status(404).send({ error: "User not found" });

    res
      .status(200)
      .send({ message: `User role updated to ${role}`, user: updatedUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Admin page
router.get("/admin", requireRole("admin"), async (req, res) => {
  try {
    const users = await UserModel.find();
    const items = await ItemModel.find();
    res.render("adminJSX", { users, items });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
