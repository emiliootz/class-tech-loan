// controllers/userController.js

const { UserModel, ItemModel } = require("../config/database");
const formatPhoneNumber = require("../utils/formatPhone");

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

    const flash = {
      success: req.flash("success"),
      error: req.flash("error"),
    };

    res.render("admin", {
      activeTab,
      users,
      items,
      cartCount,
      isLoggedIn,
      isAdmin,
      flash,
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
      req.flash("error", "User not found.");
      return res.redirect("/admin?tab=users");
    }
    req.flash("success", "User deleted successfully.");
    res.redirect("/admin?tab=users");
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

    if (isLoggedIn && req.user) {
      const user = await UserModel.findById(req.user._id).populate("cart");
      cartCount = user.cart.length;
      isAdmin = user.role === "admin";
      isStaff = user.role === "staff";
    }

    const { LoanModel } = require("../config/database");
    const [activeLoans, totalUsers, availableItems, recentLoans] = await Promise.all([
      LoanModel.countDocuments(),
      UserModel.countDocuments(),
      ItemModel.countDocuments({ status: "Available" }),
      LoanModel.find()
        .populate("userId", "name email")
        .populate("itemId", "make model assetId")
        .sort({ checkedOutAt: -1 })
        .limit(10)
        .lean(),
    ]);

    res.render("dashboard", {
      isLoggedIn,
      cartCount,
      isAdmin,
      isStaff,
      activeLoans,
      totalUsers,
      availableItems,
      recentLoans,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add a new user manually (for Google Auth users).
 */
exports.addUser = async (req, res, next) => {
  let { name, email, phone, role } = req.body;

  if (!name || !email || !role || !phone) {
    req.flash("error", "All fields are required.");
    return res.redirect("/admin?tab=users");
  }

  if (!["user", "staff", "admin"].includes(role)) {
    req.flash("error", "Invalid role selected.");
    return res.redirect("/admin?tab=users");
  }

  phone = formatPhoneNumber(phone);

  if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
    return res
      .status(400)
      .json({ message: "Invalid phone number format. Use 999-999-9999." });
  }

  try {
    let existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      // If user exists but has no googleId, update their role and phone
      if (!existingUser.googleId) {
        existingUser.role = role;
        existingUser.phone = phone;
        await existingUser.save();
      }
      return res.redirect("/admin?tab=users");
    }

    // Create a new user
    const newUser = new UserModel({
      name,
      email,
      role,
      phone,
      googleId: null,
      disabled: false,
    });

    await newUser.save();
    req.flash("success", `User "${name}" added successfully.`);
    res.redirect("/admin?tab=users");
  } catch (error) {
    req.flash("error", "Failed to add user. Please try again.");
    res.redirect("/admin?tab=users");
  }
};

exports.updateUserPhone = async (req, res, next) => {
  const userId = req.params.id;
  let { phone } = req.body;

  // Ensure phone is a string and format it
  if (!phone || typeof phone !== "string") {
    return res.status(400).json({ message: "Invalid phone number format." });
  }

  phone = formatPhoneNumber(phone); // Apply formatting before saving

  if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
    return res
      .status(400)
      .json({ message: "Invalid phone number format. Use 999-999-9999." });
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.redirect("/admin?tab=users"); // Redirect back to admin page
  } catch (error) {
    next(error);
  }
};

exports.updateUserDetails = async (req, res, next) => {
  const userId = req.params.id;
  let { phone, role } = req.body;

  if (!phone || typeof phone !== "string") {
    return res.status(400).json({ message: "Invalid phone number." });
  }

  phone = formatPhoneNumber(phone);

  if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
    return res
      .status(400)
      .json({ message: "Invalid phone number format. Use 999-999-9999." });
  }

  if (!["user", "staff", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role selection." });
  }

  try {
    await UserModel.findByIdAndUpdate(userId, { phone, role }, { new: true });

    res.redirect("/users");
  } catch (error) {
    next(error);
  }
};

exports.getUserEditPage = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id).lean();
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }
    const isLoggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
    const cartCount = req.user?.cart?.length || 0;
    res.render("editUser", { user, isLoggedIn, isAdmin: true, cartCount });
  } catch (error) {
    next(error);
  }
};

exports.getMyLoans = async (req, res, next) => {
  try {
    const { LoanModel } = require("../config/database");
    const isLoggedIn = req.isAuthenticated && req.isAuthenticated();
    const user = await UserModel.findById(req.user._id);
    const cartCount = user.cart.length;
    const isAdmin = user.role === "admin";
    const isStaff = user.role === "staff" || isAdmin;

    const loans = await LoanModel.find({ userId: req.user._id })
      .populate("itemId", "make model assetId picture")
      .sort({ arrivalTime: 1 })
      .lean();

    res.render("my-loans", { loans, isLoggedIn, cartCount, isAdmin, isStaff });
  } catch (error) {
    next(error);
  }
};

exports.usersPage = async (req, res, next) => {
  try {
    const isLoggedIn = req.isAuthenticated && req.isAuthenticated();
    const isAdmin = req.user?.role === "admin";
    const isStaff = req.user?.role === "staff" || isAdmin;
    const cartCount = req.user?.cart?.length || 0;

    if (!isStaff && !isAdmin) {
      return res.status(403).render("users", {
        users: [],
        isLoggedIn,
        isAdmin,
        isStaff,
        cartCount,
      });
    }

    const users = await UserModel.find({}, "name email phone role").lean();

    res.render("users", {
      users,
      isLoggedIn,
      isAdmin,
      isStaff,
      cartCount,
    });
  } catch (error) {
    next(error);
  }
};
