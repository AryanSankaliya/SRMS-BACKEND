const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Email duplicate nahi honi chahiye
      lowercase: true,
      trim: true,
    },
    password: {
      type: String, // Login ke liye
      required: true,
    },
    mobile: {
      type: String,
    },
    designation: {
      type: String, // e.g. Junior Technician, Manager
    },
    isActive: {
      type: Boolean,
      default: true, // Agar false kiya to login band
    }
  },
  {
    timestamps: true, // created, modified automatic aa jayega
  }
);

module.exports = mongoose.model("Staff", StaffSchema, "Staff");