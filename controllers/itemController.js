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
    if (isLoggedIn && req.user) {
      const user = await UserModel.findById(req.user._id).populate("cart");
      cartCount = user.cart.length;
    }

    res.render("item", {
      item,
      isLoggedIn,
      cartCount,
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
  try {
    const updatedItem = await ItemModel.findOneAndUpdate(
      { assetId },
      req.body,
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
  try {
    const newItem = new ItemModel({
      assetId,
      assetType,
      make,
      model,
      status: status || "Available", // Default to "Available" if not provided
    });
    await newItem.save();

    console.log(`Item added: ${newItem}`);
    // Redirect to the admin page after successful addition.
    res.redirect("/admin");
  } catch (error) {
    console.error("Error adding item:", error);
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
      console.log(`Item not found for id: ${id}`);
      const error = new Error("Item not found");
      error.status = 404;
      return next(error);
    }

    console.log(`Item deleted: ${deletedItem}`);

    // Optional: Verify that the item has been removed.
    const checkItem = await ItemModel.findById(id);
    if (checkItem) {
      console.error(`Item still exists after deletion: ${checkItem}`);
    } else {
      console.log("Item successfully removed from database.");
    }

    res.redirect("/admin");
  } catch (error) {
    console.error("Error deleting item:", error);
    next(error);
  }
};
