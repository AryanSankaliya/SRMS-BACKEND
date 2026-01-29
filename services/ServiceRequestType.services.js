const ServiceRequestTypeModel = require("../models/ServiceRequestType.model");

async function getAll() {
    try {
        const data = await ServiceRequestTypeModel.find();
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
        const data = await ServiceRequestTypeModel.findById(id);
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
        const data = await ServiceRequestTypeModel.findByIdAndUpdate(id, formData);
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
