const ServiceRequestModel = require("../models/ServiceRequest.model");
const ServiceRequestStatusModel = require("../models/ServiceRequestStatus.model");
const ServiceRequestTypeWisePersonModel = require("../models/ServiceRequestTypeWisePerson.model");

async function getAll(filter = {}) {
  try {
    const data = await ServiceRequestModel.find(filter)
      .populate("serviceRequestTypeId")
      .populate("serviceRequestStatusId")
      .populate("assignedToUserId", "name")
      .sort({ createdAt: -1 });

    return {
      error: false,
      data,
      message: "Get ServiceRequest list",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}

async function getById(id) {
  try {
    const data = await ServiceRequestModel.findById(id)
      .populate("serviceRequestStatusId")
      .populate("assignedToUserId");

    return {
      error: false,
      data,
      message: "Get ServiceRequest by id",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}

async function insert(formData) {
  try {
    const statusPending = await ServiceRequestStatusModel.findOne({
      serviceRequestStatusSystemName: "PENDING",
    });
    const statusAssigned = await ServiceRequestStatusModel.findOne({
      serviceRequestStatusSystemName: "ASSIGNED",
    });

    if (!statusPending || !statusAssigned) {
      throw new Error(
        "Master Data Error: PENDING or ASSIGNED status not found in DB (Check SystemName)",
      );
    }
    // automatic mapping for staff and request
    const mapping = await ServiceRequestTypeWisePersonModel.findOne({
      serviceRequestTypeId: formData.serviceRequestTypeId,
    });

    let finalStatusId = statusPending._id;
    let assignedUserId = null;
    let statusDesc = "Request created, waiting for HOD approval";

    if (mapping && mapping.staffId) {
      finalStatusId = statusAssigned._id;
      assignedUserId = mapping.staffId;
      statusDesc = "Auto-assigned based on Service Type";
    }

    const finalData = {
      ...formData,
      serviceRequestStatusId: finalStatusId,
      assignedToUserId: assignedUserId,
      serviceRequestStatusDescription: statusDesc,
      serviceRequestNo: "SR-" + Date.now(),
      serviceRequestDateTime: new Date(),
    };

    const data = await ServiceRequestModel.create(finalData);

    return {
      error: false,
      data,
      message: assignedUserId
        ? "Request Created & Auto-Assigned"
        : "Request Created & Pending for HOD",
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
    const data = await ServiceRequestModel.findByIdAndUpdate(id, formData, {
      new: true,
    });
    return {
      error: false,
      data,
      message: "Update ServiceRequest",
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
    const data = await ServiceRequestModel.findByIdAndDelete(id);
    return {
      error: false,
      data,
      message: "Delete ServiceRequest",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteById,
};
