const mongoose = require("mongoose");

const ServiceRequestTypeSchema = new mongoose.Schema(
  {
    serviceTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceType",
      required: true
    },

    serviceDeptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceDept",
      required: true
    },

    serviceRequestTypeName: {
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

    // counters (SQL me the – Mongo me bhi rakh sakte hain)
    requestTotal: {
      type: Number,
      default: 0
    },

    requestPending: {
      type: Number,
      default: 0
    },

    requestClosed: {
      type: Number,
      default: 0
    },

    requestCancelled: {
      type: Number,
      default: 0
    },

    isVisibleResource: {
      type: Boolean,
      default: true
    },

    defaultPriorityLevel: {
      type: String,
      maxlength: 50
    },

    reminderDaysAfterAssignment: {
      type: Number
    },

    isMandatoryResource: {
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

// optional but useful
ServiceRequestTypeSchema.index(
  { serviceTypeId: 1, serviceRequestTypeName: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "ServiceRequestType",
  ServiceRequestTypeSchema,
  "ServiceRequestType"
);
