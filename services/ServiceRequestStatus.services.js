const ServiceRequestStatusModel = require("../models/ServiceRequestStatus.model");

async function getAll() {
  try {
    // sorting base on drowpdown orderd (for good view) order like Pending -> In Progress -> Closed
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
    
    // validation for systemName (3 j set kariya che aemathi j hova joi)
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

async function update(id, formData) {
  try {
    // validation for systemName (3 j set kariya che aemathi j hova joi)
    if (formData.serviceRequestStatusSystemName) {
         const existingStatus = await ServiceRequestStatusModel.findOne({
            serviceRequestStatusSystemName: formData.serviceRequestStatusSystemName.toUpperCase(),
            _id: { $ne: id } // potane chhodin bija badha ne check karase
        });
        if (existingStatus) throw new Error("Status System Name already taken!");
    }

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
  update, 
  deleteById,
};