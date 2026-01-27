const ServiceRequestStatusModel = require("../models/ServiceRequestStatus.model");

async function getAllStatus() {
  try {
    const data = await ServiceRequestStatusModel.find();

    return {
      error: false,
      data,
      message: "Get all status",
    };
  } catch (error) {
    return {
      error: true,
      message: "Error to get all status",
    };
  }
}

module.exports = { getAllStatus };
