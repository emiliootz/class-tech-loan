const mongoose = require("mongoose");

// Function to format phone numbers to 999-999-9999
const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, ""); // Remove non-numeric characters
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  return phone; // If not 10 digits, return as-is (fallback)
};

// User Schema and Model
const userSchema = mongoose.Schema(
  {
    name: String,
    googleId: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      set: formatPhoneNumber, // Format before saving
      get: formatPhoneNumber, // Format when retrieving
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    role: {
      type: String,
      enum: ["user", "staff", "admin"],
      default: "user",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { getters: true }, toObject: { getters: true } }
); // Ensure get is applied when using JSON responses

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
