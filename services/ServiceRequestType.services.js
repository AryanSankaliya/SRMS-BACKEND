const ServiceDeptModel = require("../models/ServiceDept.model");
const ServiceRequestTypeModel = require("../models/ServiceRequestType.model");
const ServiceTypeModel = require("../models/ServiceType.model");

async function getAll() {
  try {
    const data = await ServiceRequestTypeModel.find()
      .populate("serviceDeptId", "serviceDeptName")
      .populate("serviceTypeId", "serviceTypeName")
      .sort({ serviceRequestTypeName: 1 });
    return {
      error: false,
      data,
      message: "Get all ServiceRequestType",
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
    const data = await ServiceRequestTypeModel.findById(id)
      .populate("serviceDeptId")
      .populate("serviceTypeId");

    return {
      error: false,
      data,
      message: "Get ServiceRequestType by id",
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
    if (!deptExists) {
      throw new Error("Invalid Service Department ID");
    }
    const typeExists = await ServiceTypeModel.findById(formData.serviceTypeId);
    if (!typeExists) {
      throw new Error("Invalid Service Type ID");
    }

    const existingReqType = await ServiceRequestTypeModel.findOne({
      serviceRequestTypeName: {
        $regex: new RegExp("^" + formData.serviceRequestTypeName + "$", "i"),
      },
    });

    if (existingReqType) {
      throw new Error(
        `Request Type '${formData.serviceRequestTypeName}' already exists!`,
      );
    }

    const data = await ServiceRequestTypeModel.create(formData);
    return {
      error: false,
      data,
      message: "Insert new ServiceRequestType",
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
    if (formData.serviceTypeId) {
      const typeExists = await ServiceTypeModel.findById(
        formData.serviceTypeId,
      );
      if (!typeExists) throw new Error("Invalid Service Type ID");
    }

    if (formData.serviceRequestTypeName) {
      const existingReqType = await ServiceRequestTypeModel.findOne({
        serviceRequestTypeName: {
          $regex: new RegExp("^" + formData.serviceRequestTypeName + "$", "i"),
        },
        _id: { $ne: id }, 
      });

      if (existingReqType) {
        throw new Error(
          `Request Type '${formData.serviceRequestTypeName}' is already taken.`,
        );
      }
    }
    const data = await ServiceRequestTypeModel.findByIdAndUpdate(id, formData , {new:true});
    return {
      error: false,
      data,
      message: "Update ServiceRequestType",
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
    const data = await ServiceRequestTypeModel.findByIdAndDelete(id);
    return {
      error: false,
      data,
      message: "Delete ServiceRequestType",
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
