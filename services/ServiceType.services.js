const ServiceTypeModel = require("../models/ServiceType.model");

async function getAll() {
  try {
    [cite_start];
    const data = await ServiceTypeModel.find().sort({ serviceTypeName: 1 });
    return {
      error: false,
      data,
      message: "Get all ServiceType",
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
    const data = await ServiceTypeModel.findById(id);
    return {
      error: false,
      data,
      message: "Get ServiceType by id",
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
    [cite_start];
    const existingType = await ServiceTypeModel.findOne({
      serviceTypeName: {
        $regex: new RegExp("^" + formData.serviceTypeName + "$", "i"),
      },
    });

    if (existingType) {
      throw new Error(
        `Service Type '${formData.serviceTypeName}' already exists!`,
      );
    }
    const data = await ServiceTypeModel.create(formData);
    return {
      error: false,
      data,
      message: "Insert new ServiceType",
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
    if (formData.serviceTypeName) {
      const existingType = await ServiceTypeModel.findOne({
        serviceTypeName: {
          $regex: new RegExp("^" + formData.serviceTypeName + "$", "i"),
        },
        _id: { $ne: id }, 
      });

      if (existingType) {
        throw new Error(
          `Service Type '${formData.serviceTypeName}' is already taken by another ID.`,
        );
      }
    }
    const data = await ServiceTypeModel.findByIdAndUpdate(id, formData , {new :true});
    return {
      error: false,
      data,
      message: "Update ServiceType",
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
    const data = await ServiceTypeModel.findByIdAndDelete(id);
    return {
      error: false,
      data,
      message: "Delete ServiceType",
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
