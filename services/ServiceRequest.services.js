const ServiceRequestModel = require("../models/ServiceRequest.model");
const ServiceRequestStatusModel = require("../models/ServiceRequestStatus.model");
const ServiceRequestTypeWisePersonModel = require("../models/ServiceRequestTypeWisePerson.model");

async function getAll(filter = {}) {
  try {
    const data = await ServiceRequestModel.find(filter)
      .populate("serviceRequestTypeId")
      .populate("serviceRequestStatusId")
      .populate("createdByUserId", "firstName lastName email")
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
      .populate("serviceRequestTypeId")
      .populate("serviceRequestStatusId")
      .populate("createdByUserId", "firstName lastName email")
      .populate("assignedToUserId", "name email");

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

async function getStats(user) {
  try {
    const roles = {
      HOD: "Hod",
      TECH: "Technician",
      USER: "User"
    };

    let filter = {};

    // 1. If Technician, only show assigned requests
    if (user.role === roles.TECH) {
      filter.assignedToUserId = user.userId; // userId from token
    }
    // 2. If User, only show created requests
    else if (user.role === roles.USER) {
      filter.userId = user.userId; // userId from token
    }
    // 3. HOD sees everything (no filter)

    // Parallel execution for performance
    const [total, pending, assigned, inProgress, closed] = await Promise.all([
      ServiceRequestModel.countDocuments(filter),
      ServiceRequestModel.countDocuments({ ...filter, serviceRequestStatusDescription: { $regex: /pending/i } }), // Better to use ID, but for now regex or we need to fetch Status IDs
      ServiceRequestModel.countDocuments({ ...filter, serviceRequestStatusDescription: { $regex: /assigned/i } }),
      ServiceRequestModel.countDocuments({ ...filter, serviceRequestStatusDescription: { $regex: /progress/i } }),
      ServiceRequestModel.countDocuments({ ...filter, serviceRequestStatusDescription: { $regex: /closed/i } })
    ]);

    // Better approach: Fetch Status IDs first to be accurate
    // But since I don't have Status IDs easily available here without fetching, 
    // I will fetch them now to be precise.
    const statusMap = await ServiceRequestStatusModel.find({});
    const getId = (name) => statusMap.find(s => s.serviceRequestStatusSystemName === name)?._id;

    const pendingCount = await ServiceRequestModel.countDocuments({ ...filter, serviceRequestStatusId: getId("PENDING") });
    const assignedCount = await ServiceRequestModel.countDocuments({ ...filter, serviceRequestStatusId: getId("ASSIGNED") });
    const inProgressCount = await ServiceRequestModel.countDocuments({ ...filter, serviceRequestStatusId: getId("IN_PROGRESS") });
    const closedCount = await ServiceRequestModel.countDocuments({ ...filter, serviceRequestStatusId: getId("CLOSED") });

    // Total is fine as is

    return {
      error: false,
      data: {
        total,
        pending: pendingCount,
        assigned: assignedCount,
        inProgress: inProgressCount,
        closed: closedCount
      },
      message: "Dashboard Stats Fetched"
    };

  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteById,
  getStats
};
