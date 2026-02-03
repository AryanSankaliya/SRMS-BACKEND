const ServiceDeptModel = require("../models/ServiceDept.model");

async function getAll() {
  try {
    const data = await ServiceDeptModel.find().sort({ serviceDeptName: 1 });

    return {
      error: false,
      data,
      message: "Get all department",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}

async function getByID(id) {
  try {
    const data = await ServiceDeptModel.findById(id);

    return {
      error: false,
      data,
      message: "Get department by id",
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
    const existingDept = await ServiceDeptModel.findOne({
      serviceDeptName: {
        $regex: new RegExp(`^ ${formData.serviceDeptName} $`, "i"),
      },
    });

    if (existingDept) {
      throw new Error(
        `Department '${formData.serviceDeptName}' already exists!`,
      );
    }

    const data = await ServiceDeptModel.create(formData);

    return {
      error: false,
      data,
      message: "insert new department",
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
    if (formData.serviceDeptName) {
      const existingDept = await ServiceDeptModel.findOne({
        serviceDeptName: {
          $regex: new RegExp("^" + formData.serviceDeptName + "$", "i"),
        },
        _id: { $ne: id },
      });

      if (existingDept) {
        throw new Error(
          `Department name '${formData.serviceDeptName}' is already taken by another ID.`,
        );
      }
    }

    const data = await ServiceDeptModel.findByIdAndUpdate(id, formData,{new:true});

    return {
      error: false,
      data,
      message: "update department",
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
    const data = await ServiceDeptModel.findByIdAndDelete(id);

    return {
      error: false,
      data,
      message: "delete department",
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
  getByID,
  insert,
  update,
  deleteById,
};
