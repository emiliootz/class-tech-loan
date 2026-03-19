// controllers/itemController.js

const { ItemModel } = require("../config/database");
const { UserModel } = require("../config/database");

/**
 * Get all items.
 */
exports.getItems = async (req, res, next) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific item by its ObjectId.
 * Renders the "item" view along with login and cart count information.
 */
exports.getItem = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const item = await ItemModel.findById(itemId);
    if (!item) {
      const error = new Error("Item not found");
      error.status = 404;
      return next(error);
    }

    // Determine login status and fetch cart count if applicable.
    const isLoggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
    let cartCount = 0;
    let isAdmin = false;
    if (isLoggedIn && req.user) {
      const user = await UserModel.findById(req.user._id).populate("cart");
      cartCount = user.cart.length;
      isAdmin = user.role === "admin";
    }

    res.render("item", {
      item,
      isLoggedIn,
      cartCount,
      isAdmin,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an item using its assetId.
 * Note: assetId is a custom string identifier; therefore, ObjectId validation is not applied.
 */
exports.updateItem = async (req, res, next) => {
  const assetId = req.params.assetId;
  const { assetType, make, model, status, picture, location } = req.body;
  const allowedStatuses = ["Available", "Loaned", "Assigned To Location"];
  if (status && !allowedStatuses.includes(status)) {
    const error = new Error("Invalid status value");
    error.status = 400;
    return next(error);
  }
  const updates = {};
  if (assetType !== undefined) updates.assetType = assetType;
  if (make !== undefined) updates.make = make;
  if (model !== undefined) updates.model = model;
  if (status !== undefined) updates.status = status;
  // Prefer an uploaded file over a URL string
  const uploadedPicture = req.file ? `/uploads/${req.file.filename}` : undefined;
  if (uploadedPicture) updates.picture = uploadedPicture;
  else if (picture !== undefined) updates.picture = picture;
  if (location !== undefined) updates.location = location;
  try {
    const updatedItem = await ItemModel.findOneAndUpdate(
      { assetId },
      updates,
      { new: true }
    );
    if (!updatedItem) {
      const error = new Error("Item not found");
      error.status = 404;
      return next(error);
    }
    res.status(200).send({
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add a new item to the database.
 * Only admins can add items, so this function is expected to be protected by role-based middleware.
 */
exports.addItem = async (req, res, next) => {
  const { assetId, assetType, make, model, status } = req.body;
  const picture = req.file ? `/uploads/${req.file.filename}` : undefined;
  try {
    const newItem = new ItemModel({
      assetId,
      assetType,
      make,
      model,
      status: status || "Available",
      ...(picture && { picture }),
    });
    await newItem.save();
    res.redirect("/admin");
  } catch (error) {
    next(error);
  }
};

/**
 * Delete an item from the database.
 * Only admins can delete items.
 */
exports.deleteItem = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedItem = await ItemModel.findByIdAndDelete(id);
    if (!deletedItem) {
      const error = new Error("Item not found");
      error.status = 404;
      return next(error);
    }
    res.redirect("/admin");
  } catch (error) {
    next(error);
  }
};
