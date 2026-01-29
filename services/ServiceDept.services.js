const ServiceDeptModel = require("../models/ServiceDept.model");

async function getAll() {
  try {
    const data = await ServiceDeptModel.find();

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

async function upadte(id, formData) {
  try {
    const data = await ServiceDeptModel.findByIdAndUpdate(
      id,
      formData,
    );

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
  upadte,
  deleteById
};
