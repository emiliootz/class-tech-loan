// controllers/userController.js

const { UserModel, ItemModel } = require("../config/database");

/**
 * Assign a role to an existing user.
 * Accepts a userId parameter and a role in the request body.
 */
exports.assignRole = async (req, res, next) => {
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
    res.status(200).json({
      message: `User role updated to ${role}`,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Render the admin settings page.
 * Displays either a list of users or items based on the active tab.
 */
exports.getAdminPage = async (req, res, next) => {
  try {
    const activeTab = req.query.tab || "users";
    const users = activeTab === "users" ? await UserModel.find().lean() : [];
    const items = activeTab === "items" ? await ItemModel.find().lean() : [];
    const cartCount = req.user && req.user.cart ? req.user.cart.length : 0;
    const isLoggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
    const isAdmin = req.user && req.user.role === "admin";

    res.render("admin", {
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
};

/**
 * Update a user's role via the admin panel.
 */
exports.updateUserRole = async (req, res, next) => {
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
};

/**
 * Disable a user to prevent them from logging in.
 * Note: Ensure your User schema includes a "disabled" field.
 */
exports.disableUser = async (req, res, next) => {
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
};

/**
 * Delete a user from the database.
 */
exports.deleteUser = async (req, res, next) => {
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
};

/**
 * Redirect the /protected route to the home page.
 */
exports.redirectProtected = (req, res) => {
  res.redirect("/");
};

exports.dashboardPage = async (req, res, next) => {
  try {
    const isLoggedIn = req.isAuthenticated && req.isAuthenticated();
    let cartCount = 0;
    let isAdmin = false;
    let isStaff = false;
    // Calculate dashboard data (this is an example; you'll need to compute your own)
    const dashboardData = [
      { day: "Monday", loans: 5 },
      { day: "Tuesday", loans: 8 },
      { day: "Wednesday", loans: 6 },
      { day: "Thursday", loans: 10 },
      { day: "Friday", loans: 7 },
      { day: "Saturday", loans: 4 },
      { day: "Sunday", loans: 3 },
    ];

    if (isLoggedIn && req.user) {
      const user = await UserModel.findById(req.user._id).populate("cart");
      cartCount = user.cart.length;
      isAdmin = user.role === "admin";
      isStaff = user.role === "staff";
    }
    res.render("Dashboard", {
      isLoggedIn,
      cartCount,
      isAdmin,
      isStaff,
      dashboardData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add a new user manually (for Google Auth users).
 */
exports.addUser = async (req, res, next) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.redirect("/admin?tab=users");
  }

  if (!["user", "staff", "admin"].includes(role)) {
    return res.redirect("/admin?tab=users");
  }

  try {
    let existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      // If user exists but has no googleId, update their role
      if (!existingUser.googleId) {
        existingUser.role = role;
        await existingUser.save();
      }
      return res.redirect("/admin?tab=users");
    }

    // Create a new user
    const newUser = new UserModel({
      name,
      email,
      role,
      googleId: null, // Will be updated when they log in via Google
      disabled: false,
    });

    await newUser.save();
    res.redirect("/admin?tab=users"); // Redirect to admin page
  } catch (error) {
    res.redirect("/admin?tab=users");
  }
};
