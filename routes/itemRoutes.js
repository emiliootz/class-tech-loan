/*****************************
 *       Item Route          *
 *****************************/
/*
  This file defines all routes related to items.
  In app.js, it's imported and used as follows:
    const itemRoutes = require("./routes/itemRoutes");
    app.use("/", itemRoutes);
*/

const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const { requireRole } = require("../middleware/auth");
const itemController = require("../controllers/itemController");
const router = express.Router();

/*****************************
 *        Get Items          *
 *****************************/
// Get all items
router.get("/items", itemController.getItems);

// Get a specific item by ID (itemId is validated)
router.get("/item/:itemId", validateObjectId("itemId"), itemController.getItem);

/*****************************
 *       Update Item         *
 *****************************/
// Update item using assetId (assetId is a custom identifier, not a MongoDB ObjectId)
router.put("/update-item/:assetId", itemController.updateItem);

/*****************************
 *     Add/Delete Item       *
 *****************************/
// Add a new item (requires admin role)
router.post("/add-item", requireRole("admin"), itemController.addItem);

// Delete an item (requires admin role, ObjectId validated)
router.delete(
  "/delete-item/:id",
  requireRole("admin"),
  validateObjectId("id"),
  itemController.deleteItem
);

module.exports = router;
