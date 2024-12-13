
const mongoose = require('mongoose');



// Item Schema and Model
const itemSchema = new mongoose.Schema({
  assetId: {
    type: String,
    required: true,
    unique: true,
  },
  assetType: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    default: 'N/A',
  },
  umbTagNumber: {
    type: String,
    default: 'N/A',
  },
  description: {
    type: String,
    default: 'No description available',
  },
  status: {
    type: String,
    enum: ['Available', 'Loaned', 'Assigned To Location'],
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;