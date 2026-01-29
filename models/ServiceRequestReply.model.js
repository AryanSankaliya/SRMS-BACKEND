const mongoose = require("mongoose");

const ServiceRequestReplySchema = new mongoose.Schema(
  {
    serviceRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest",
      required: true
    },

    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff"
    },

    serviceRequestReplyDateTime: {
      type: Date,
      default: Date.now
    },

    serviceRequestReplyDescription: {
      type: String,
      required: true,
      maxlength: 250
    },

    attachmentPath: {
      type: String,
      maxlength: 250
    },

    serviceRequestStatusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequestStatus",
      required: true
    },

    serviceRequestStatusDateTime: {
      type: Date,
      default: Date.now
    },

    serviceRequestStatusByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    serviceRequestStatusDescription: {
      type: String,
      maxlength: 250
    },

    createdByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "ServiceRequestReply",
  ServiceRequestReplySchema,
  "ServiceRequestReply"
);
