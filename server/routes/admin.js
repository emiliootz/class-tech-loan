/**
 * This file contains all routes related to administrative actions.
 */

const express = require("express");
const router = express.Router();
const { requireRole } = require("../config/authMiddleware");
const { UserModel } = require("../config/database");

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

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res
      .status(200)
      .send({ message: `User role updated to ${role}`, user: updatedUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// User management page
router.get("/manage-users", requireRole("admin"), async (req, res) => {
  try {
    const users = await UserModel.find(); // Fetch all users
    res.render("manage-users", { users });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
