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
const router = express.Router();

/*****************************
 *        Get Items          *
 *****************************/
/*
  Routes for getting all items and getting an item
  for a specific item by ID 
*/
// Get all items
router.get("/items", async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get a specific item by ID
router.get("/item/:itemId", async (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({ error: "Invalid itemId" });
  }

  try {
    const item = await ItemModel.findById(itemId);
    if (!item) return res.status(404).send({ error: "Item not found" });

    res.render("itemJSX", { item });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

/*****************************
 *       Update Item         *
 *****************************/
/*
  update item using the assetId using the parameters 
  within the Item Model
*/

router.put("/update-item/:assetId", async (req, res) => {
  const assetId = req.params.assetId;
  try {
    const updatedItem = await ItemModel.findOneAndUpdate(
      { assetId },
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).send({ error: "Item not found" });
    }
    res
      .status(200)
      .send({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

/*****************************
 *     Add/Delete Item       *
 *****************************/
/*
  Add an item to the MongoDB. Only users with the admin role
  are able to add new items to the database
*/

router.post("/add-item", requireRole("admin"), async (req, res) => {
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
    res.status(500).json({ error: "Failed to add item" });
  }
});

/*
  Delete an item from the MongoDB. Only users with the admin role
  are able to delete items from the database
*/

router.delete("/delete-item/:id", requireRole("admin"), async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId" });
  }

  try {
    const deletedItem = await ItemModel.findByIdAndDelete(id);
    if (!deletedItem) {
      console.log(`Item not found for id: ${id}`);
      return res.status(404).json({ error: "Item not found" });
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
    res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;
