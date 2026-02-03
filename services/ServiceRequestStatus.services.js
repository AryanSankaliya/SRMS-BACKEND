const ServiceRequestStatusModel = require("../models/ServiceRequestStatus.model");

async function getAll() {
  try {
    // CHANGE 1: Sorting lagayi hai (Sequence wise)
    // Taaki Dropdown me order sahi dikhe: Pending -> In Progress -> Closed
    const data = await ServiceRequestStatusModel.find().sort({ sequence: 1 });

    return {
      error: false,
      data,
      message: "Get all status",
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
    const data = await ServiceRequestStatusModel.findById(id);
    return {
      error: false,
      data,
      message: "Get status by id",
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
    // CHANGE 2: Duplicate Validation (System Name Unique hona chahiye)
    // Agar 'PENDING' pehle se hai, toh dusra mat banne do
    const existingStatus = await ServiceRequestStatusModel.findOne({
        serviceRequestStatusSystemName: formData.serviceRequestStatusSystemName.toUpperCase()
    });
    
    if (existingStatus) {
        throw new Error("Status with this System Name already exists!");
    }

    const data = await ServiceRequestStatusModel.create(formData);

    return {
      error: false,
      data,
      message: "Insert new status",
    };
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
}

// CHANGE 3: Spelling Fix (upadte -> update)
async function update(id, formData) {
  try {
    // Update me bhi Duplicate check (Optional but recommended)
    if (formData.serviceRequestStatusSystemName) {
         const existingStatus = await ServiceRequestStatusModel.findOne({
            serviceRequestStatusSystemName: formData.serviceRequestStatusSystemName.toUpperCase(),
            _id: { $ne: id }
        });
        if (existingStatus) throw new Error("Status System Name already taken!");
    }

    // { new: true } lagaya taaki updated data wapas mile
    const data = await ServiceRequestStatusModel.findByIdAndUpdate(
      id,
      formData,
      { new: true }
    );

    return {
      error: false,
      data,
      message: "Update status",
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
    
    const data = await ServiceRequestStatusModel.findByIdAndDelete(id);

    return {
      error: false,
      data,
      message: "Delete status",
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
  update, // Export name fixed
  deleteById,
};