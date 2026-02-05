const mongoose = require("mongoose");

const ServiceRequestTypeWisePersonSchema = new mongoose.Schema(
  {
    serviceRequestTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequestType",
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

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "ServiceRequestTypeWisePerson",
  ServiceRequestTypeWisePersonSchema,
  "ServiceRequestTypeWisePerson"
);
