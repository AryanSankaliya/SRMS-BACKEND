const ServiceRequestModel = require("../models/ServiceRequest.model");
const ServiceRequestReplyModel = require("../models/ServiceRequestReply.model");
const ServiceRequestStatusModel = require("../models/ServiceRequestStatus.model");

async function getRepliesByRequestId(requestId) {
  try {
    const data = await ServiceRequestReplyModel.find({
      serviceRequestId: requestId,
    })
      .populate("staffId", "name") 
      .populate("serviceRequestStatusId", "serviceRequestStatusName") 
      .sort({ created: 1 }); 

    return {
      error: false,
      data,
      message: "Chat history fetched",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}

async function addReply(formData) {
  try {
    const ticket = await ServiceRequestModel.findById(formData.serviceRequestId);
    if (!ticket) {
      throw new Error("Invalid Service Request ID");
    }

    const statusObj = await ServiceRequestStatusModel.findById(formData.serviceRequestStatusId);
    if (!statusObj) {
      throw new Error("Invalid Status ID");
    }

    const replyData = await ServiceRequestReplyModel.create({
      ...formData,
      serviceRequestReplyDateTime: new Date(),
      created: new Date(),
    });

    await ServiceRequestModel.findByIdAndUpdate(formData.serviceRequestId, {
      serviceRequestStatusId: formData.serviceRequestStatusId,
      serviceRequestStatusDescription: statusObj.description, 
      modified: new Date() 
    });

    return {
      error: false,
      data: replyData,
      message: "Reply added and Ticket Status updated successfully",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}

async function update(id, formData) {
  try {
    const data = await ServiceRequestReplyModel.findByIdAndUpdate(id, formData, { new: true });
    return {
      error: false,
      data,
      message: "Update ServiceRequestReply",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}

async function deleteById(id) {
  try {
    const data = await ServiceRequestReplyModel.findByIdAndDelete(id);
    return {
      error: false,
      data,
      message: "Delete ServiceRequestReply",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}

module.exports = {
  getRepliesByRequestId,
  addReply,              
  update,
  deleteById,
};