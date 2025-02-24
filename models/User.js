const mongoose = require("mongoose");

const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, ""); // Remove non-numeric characters
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  return phone; // If not 10 digits, return as-is (fallback)
};

const userSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true, // Ensure emails are unique
      required: false, // Make email required for consistency
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple users without Google IDs
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
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
