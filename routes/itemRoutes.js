/*****************************
 *       Item Route          *
 *****************************/
/*
  Within this file is all the routes for items

  within app.js this is imported using : 
  
  const itemRoutes = require("./routes/itemRoutes");
   and 
  app.use("/", itemRoutes);

*/

/*****************************
 *        Imports            *
 *****************************/
const express = require("express");
const mongoose = require("mongoose");
const { ItemModel } = require("../config/database");
const { requireRole } = require("../middleware/auth");
const { UserModel } = require("../config/database");
const router = express.Router();

/*****************************
 *        Get Items          *
 *****************************/
/*
  Routes for getting all items and getting an item
  for a specific item by ID 
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
router.get("/item/:itemId", async (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    const error = new Error("Invalid itemId");
    error.status = 400;
    return next(error);
  }

  try {
    const item = await ItemModel.findById(itemId);
    if (!item) {
      const error = new Error("Item not found");
      error.status = 404;
      return next(error);
    }

    // If user may or may not be logged in, we can check for isAuthenticated
    const isLoggedIn = req.isAuthenticated ? req.isAuthenticated() : false;
    // If you want cartCount, you'd fetch it from the user's cart if they're logged in
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
});

/*****************************
 *       Update Item         *
 *****************************/
/*
  update item using the assetId using the parameters 
  within the Item Model
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
    res
      .status(200)
      .send({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    return next(error);
  }
});

/*****************************
 *     Add/Delete Item       *
 *****************************/
/*
  Add an item to the MongoDB. Only users with the admin role
  are able to add new items to the database
*/

router.post("/add-item", requireRole("admin"), async (req, res, next) => {
  const { assetId, assetType, make, model, status } = req.body;

  try {
    const newItem = new ItemModel({
      assetId,
      assetType,
      make,
      model,
      status: status || "Available", // The deafult status is Available if not given
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

/*
  Delete an item from the MongoDB. Only users with the admin role
  are able to delete items from the database
*/

router.delete(
  "/delete-item/:id",
  requireRole("admin"),
  async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid ObjectId");
      error.status = 400;
      return next(error);
    }

    try {
      const deletedItem = await ItemModel.findByIdAndDelete(id);
      if (!deletedItem) {
        console.log(`Item not found for id: ${id}`);
        const error = new Error("Item not found");
        error.status = 404;
        return next(error);
      }

      console.log(`Item deleted: ${deletedItem}`);

      // Check if the item still exists in the database
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
