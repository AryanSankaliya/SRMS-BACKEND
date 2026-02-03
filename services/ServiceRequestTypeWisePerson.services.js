const ServiceRequestTypeWisePersonModel = require("../models/ServiceRequestTypeWisePerson.model");
const ServiceRequestTypeModel = require("../models/ServiceRequestType.model");
const StaffModel = require("../models/Staff.model");

async function getAll() {
  try {
    const data = await ServiceRequestTypeWisePersonModel.find()
      .populate("serviceRequestTypeId", "serviceRequestTypeName")
      .populate("staffId", "name email")
      .sort({ createdAt: -1 });
    return {
      error: false,
      data,
      message: "Get all ServiceRequestTypeWisePerson",
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
    const data = await ServiceRequestTypeWisePersonModel.findById(id)
      .populate("serviceRequestTypeId")
      .populate("staffId");
    return {
      error: false,
      data,
      message: "Get ServiceRequestTypeWisePerson by id",
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
    const typeExists = await ServiceRequestTypeModel.findById(
      formData.serviceRequestTypeId,
    );
    if (!typeExists) throw new Error("Invalid Service Request Type ID");

    const staffExists = await StaffModel.findById(formData.staffId);
    if (!staffExists) throw new Error("Invalid Staff ID");

    const existingMapping = await ServiceRequestTypeWisePersonModel.findOne({
      serviceRequestTypeId: formData.serviceRequestTypeId,
    });

    if (existingMapping) {
      throw new Error(
        "This Service Type is already assigned to someone. Update or Delete the old mapping first.",
      );
    }
    if (
      formData.toDate &&
      new Date(formData.fromDate) > new Date(formData.toDate)
    ) {
      throw new Error("From Date cannot be later than To Date");
    }
    const data = await ServiceRequestTypeWisePersonModel.create(formData);
    return {
      error: false,
      data,
      message: "Insert new ServiceRequestTypeWisePerson",
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
    if (formData.serviceRequestTypeId) {
      const typeExists = await ServiceRequestTypeModel.findById(
        formData.serviceRequestTypeId,
      );
      if (!typeExists) throw new Error("Invalid Service Request Type ID");
    }
    if (formData.staffId) {
      const staffExists = await StaffModel.findById(formData.staffId);
      if (!staffExists) throw new Error("Invalid Staff ID");
    }

    if (formData.serviceRequestTypeId) {
      const existingMapping = await ServiceRequestTypeWisePersonModel.findOne({
        serviceRequestTypeId: formData.serviceRequestTypeId,
        _id: { $ne: id },
      });
      if (existingMapping) {
        throw new Error(
          "This Service Type is already assigned to someone else.",
        );
      }
    }
    const data = await ServiceRequestTypeWisePersonModel.findByIdAndUpdate(
      id,
      formData,
      { new: true }
    );
    return {
      error: false,
      data,
      message: "Update ServiceRequestTypeWisePerson",
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
    const data = await ServiceRequestTypeWisePersonModel.findByIdAndDelete(id);
    return {
      error: false,
      data,
      message: "Delete ServiceRequestTypeWisePerson",
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
