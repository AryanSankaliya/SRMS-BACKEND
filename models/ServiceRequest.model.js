const mongoose = require("mongoose");

const ServiceRequestSchema = new mongoose.Schema(
  {
    serviceRequestNo: {
      type: String,
      required: true,
      unique: true,
      maxlength: 500
    },

    serviceRequestDateTime: {
      type: Date,
      default: Date.now
    },

    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff"
    },

    serviceRequestTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequestType",
      required: true
    },

    serviceRequestTitle: {
      type: String,
      required: true,
      maxlength: 250
    },

    serviceRequestDescription: {
      type: String,
      required: true,
      maxlength: 2000
    },

    attachmentPaths: {
      type: [String] // multiple attachments
    },

    serviceRequestStatusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequestStatus",
      required: true
    },

    serviceRequestStatusDateTime: Date,
    serviceRequestStatusByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    serviceRequestStatusDescription: {
      type: String,
      maxlength: 500
    },

    approvalStatus: {
      type: String,
      maxlength: 50
    },

    approvalStatusDateTime: Date,
    approvalStatusByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    approvalStatusDescription: {
      type: String,
      maxlength: 250
    },

    assignedToUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    assignedDateTime: Date,
    assignedByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    assignedDescription: {
      type: String,
      maxlength: 250
    },

    priorityLevel: {
      type: String,
      maxlength: 50
    },

    onBehalfOfStaffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff"
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
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
  "ServiceRequest",
  ServiceRequestSchema,
  "ServiceRequest"
);
