const ServiceTypeModel = require("../models/ServiceType.model");

async function getAll() {
    try {
        const data = await ServiceTypeModel.find();
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
        const data = await ServiceTypeModel.findByIdAndUpdate(id, formData);
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
