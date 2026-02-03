const ServiceDeptModel = require("../models/ServiceDept.model");
const ServiceDeptPersonModel = require("../models/ServiceDeptPerson.model");
const StaffModel = require("../models/Staff.model");

async function getAll() {
  try {
    const data = await ServiceDeptPersonModel.find()
      .populate("serviceDeptId", "serviceDeptName") // Dept Name
      .populate("staffId", "name email") // Staff Name
      .sort({ serviceDeptId: 1 });
    return {
      error: false,
      data,
      message: "Get all Dept-Staff Mappings",
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
    const data = await ServiceDeptPersonModel.findById(id)
      .populate("serviceDeptId")
      .populate("staffId");
    return {
      error: false,
      data,
      message: "Get mapping by id",
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
    const deptExists = await ServiceDeptModel.findById(formData.serviceDeptId);
    if (!deptExists) throw new Error("Invalid Service Department ID");

    const staffExists = await StaffModel.findById(formData.staffId);
    if (!staffExists)
      throw new Error("Invalid Staff ID - No such staff member found");

    const existingMap = await ServiceDeptPersonModel.findOne({
      serviceDeptId: formData.serviceDeptId,
      staffId: formData.staffId,
    });

    if (existingMap)
      throw new Error("This Staff is already mapped to this Department.");

    const data = await ServiceDeptPersonModel.create(formData);
    return {
      error: false,
      data,
      message: "Insert new ServiceDeptPerson",
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
    if (formData.serviceDeptId) {
      const deptExists = await ServiceDeptModel.findById(
        formData.serviceDeptId,
      );
      if (!deptExists) throw new Error("Invalid Service Department ID");
    }

    if (formData.staffId) {
      const staffExists = await StaffModel.findById(formData.staffId);
      if (!staffExists) throw new Error("Invalid Staff ID");
    }

    if (formData.serviceDeptId || formData.staffId) {
      const existingMap = await ServiceDeptPersonModel.findOne({
        serviceDeptId: formData.serviceDeptId || undefined,
        staffId: formData.staffId || undefined,
        _id: { $ne: id },
      });
      if (existingMap) {
        throw new Error(
          "This Staff is already mapped to this Department (Duplicate).",
        );
      }
    }

    const data = await ServiceDeptPersonModel.findByIdAndUpdate(id, formData, {
      new: true,
    });

    return {
      error: false,
      data,
      message: "Update ServiceDeptPerson",
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
    const data = await ServiceDeptPersonModel.findByIdAndDelete(id);
    return {
      error: false,
      data,
      message: "Delete ServiceDeptPerson",
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
