const mongoose = require("mongoose");

const ServiceRequestStatusSchema = new mongoose.Schema(
  {
    serviceRequestStatusName: {
      type: String,
      required: true,
      trim: true,
    },

    serviceRequestStatusSystemName: {
      type: String,
      required: true,
      unique: true,
      uppercase: true, // PENDING, CLOSED
    },

    sequence: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
    },

    isOpen: {
      type: Boolean,
      default: true,
    },

    isNoFurtherActionRequired: {
      type: Boolean,
      default: false,
    },

    isAllowedForTechnician: {
      type: Boolean,
      default: true,
    },

    createdByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model(
  "ServiceRequestStatus",
  ServiceRequestStatusSchema,
  "ServiceRequestStatus"
);
