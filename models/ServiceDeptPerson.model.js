const mongoose = require("mongoose");

const ServiceDeptPersonSchema = new mongoose.Schema(
  {
    serviceDeptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceDept",
      required: true
    },

    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", 
      required: true
    },

    fromDate: {
      type: Date,
      required: true
    },

    toDate: {
      type: Date
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

    isHODStaff: {
      type: Boolean,
      default: false
    },

    // soft control
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
  "ServiceDeptPerson",
  ServiceDeptPersonSchema,
  "ServiceDeptPerson"
);
