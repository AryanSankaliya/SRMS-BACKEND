const mongoose = require("mongoose");

const ServiceDeptSchema = new mongoose.Schema(
  {
    serviceDeptName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250
    },

    campusId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Campus",
      required: true
    },

    description: {
      type: String,
      maxlength: 250
    },

    createdByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    ccEmailToCSV: {
      type: String, // comma separated emails
      maxlength: 250
    },

    isRequestTitleDisable: {
      type: Boolean,
      default: false
    },

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
  "ServiceDept",
  ServiceDeptSchema,
  "ServiceDept"
);
