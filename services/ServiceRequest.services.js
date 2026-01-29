const ServiceRequestModel = require("../models/ServiceRequest.model");

async function getAll() {
    try {
        const data = await ServiceRequestModel.find();
        return {
            error: false,
            data,
            message: "Get all ServiceRequest",
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
        const data = await ServiceRequestModel.findById(id);
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
        const data = await ServiceRequestModel.create(formData);
        return {
            error: false,
            data,
            message: "Insert new ServiceRequest",
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
        const data = await ServiceRequestModel.findByIdAndUpdate(id, formData);
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

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteById,
};
