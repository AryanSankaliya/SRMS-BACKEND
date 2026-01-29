const ServiceRequestReplyModel = require("../models/ServiceRequestReply.model");

async function getAll() {
    try {
        const data = await ServiceRequestReplyModel.find();
        return {
            error: false,
            data,
            message: "Get all ServiceRequestReply",
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
        const data = await ServiceRequestReplyModel.findById(id);
        return {
            error: false,
            data,
            message: "Get ServiceRequestReply by id",
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
        const data = await ServiceRequestReplyModel.create(formData);
        return {
            error: false,
            data,
            message: "Insert new ServiceRequestReply",
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
        const data = await ServiceRequestReplyModel.findByIdAndUpdate(id, formData);
        return {
            error: false,
            data,
            message: "Update ServiceRequestReply",
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
        const data = await ServiceRequestReplyModel.findByIdAndDelete(id);
        return {
            error: false,
            data,
            message: "Delete ServiceRequestReply",
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
