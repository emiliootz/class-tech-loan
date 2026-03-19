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
const upload = require("../config/multer");
const router = express.Router();

/*****************************
 *        Get Items          *
 *****************************/
// Get all items
router.get("/items", itemController.getItems);

// Get a specific item by ID (itemId is validated)
router.get("/item/:itemId", validateObjectId("itemId"), itemController.getItem);

/*****************************
 *     Add/Delete Item       *
 *****************************/
// Add a new item (requires admin role, optional image upload)
router.post(
  "/add-item",
  requireRole("admin"),
  upload.single("picture"),
  itemController.addItem
);

// Update item using assetId with optional image upload
router.put(
  "/update-item/:assetId",
  requireRole("admin"),
  upload.single("picture"),
  itemController.updateItem
);

// Delete an item (requires admin role, ObjectId validated)
router.delete(
  "/delete-item/:id",
  requireRole("admin"),
  validateObjectId("id"),
  itemController.deleteItem
);

module.exports = router;
