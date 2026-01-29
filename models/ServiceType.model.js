const mongoose = require("mongoose");

const ServiceTypeSchema = new mongoose.Schema(
  {
    serviceTypeName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250
    },

    description: {
      type: String,
      maxlength: 250
    },

    sequence: {
      type: Number,
      default: 0
    },

    createdByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isForStaff: {
      type: Boolean,
      default: false
    },

    isForStudent: {
      type: Boolean,
      default: false
    },

    // safe future control
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

module.exports = mongoose.model(
  "ServiceType",
  ServiceTypeSchema,
  "ServiceType"
);
