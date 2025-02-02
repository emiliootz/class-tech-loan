/*****************************
 *       Item Route          *
 *****************************/
/*
  Within this file is all the routes for items.

  In app.js, this file is imported and used as follows:

    const itemRoutes = require("./routes/itemRoutes");
    app.use("/", itemRoutes);

  The routes will use:
    req: to request data
    res: to render data to the page
    next: to pass any errors to the error handler middleware
*/

/*****************************
 *        Imports            *
 *****************************/
const express = require("express");
const mongoose = require("mongoose");
const { ItemModel } = require("../config/database");
const { requireRole } = require("../middleware/auth");
const { UserModel } = require("../config/database");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();

/*****************************
 *        Get Items          *
 *****************************/
/*
  Routes for getting all items and fetching a specific item by ID.
*/

// Get all items
router.get("/items", async (req, res, next) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
  } catch (error) {
    return next(error);
  }
});

// Get a specific item by ID
router.get(
  "/item/:itemId",
  validateObjectId("itemId"),
  async (req, res, next) => {
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
      return next(error);
    }
  }
);

/*****************************
 *       Update Item         *
 *****************************/
/*
  Update an item using its assetId.
  (Note: assetId is a custom string identifier, so ObjectId validation is not applied.)
*/
router.put("/update-item/:assetId", async (req, res, next) => {
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
    return next(error);
  }
});

/*****************************
 *     Add/Delete Item       *
 *****************************/
/*
  Routes for adding or deleting an item from the database.
  Only users with the admin role are allowed to perform these operations.
*/

// Add an item
router.post("/add-item", requireRole("admin"), async (req, res, next) => {
  const { assetId, assetType, make, model, status } = req.body;

  try {
    const newItem = new ItemModel({
      assetId,
      assetType,
      make,
      model,
      status: status || "Available", // Default status is "Available" if not provided
    });

    await newItem.save();

    console.log(`Item added: ${newItem}`);

    // Redirect to the admin page after successful addition
    res.redirect("/admin");
  } catch (error) {
    console.error("Error adding item:", error);
    return next(error);
  }
});

// Delete an item
router.delete(
  "/delete-item/:id",
  requireRole("admin"),
  validateObjectId("id"),
  async (req, res, next) => {
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

      // Optional: Verify that the item is removed from the database
      const checkItem = await ItemModel.findById(id);
      if (checkItem) {
        console.error(`Item still exists after deletion: ${checkItem}`);
      } else {
        console.log(`Item successfully removed from database.`);
      }

      res.redirect("/admin"); // Redirect to the admin page
    } catch (error) {
      console.error("Error deleting item:", error);
      return next(error);
    }
  }
);

module.exports = router;
