const ServiceRequestTypeWisePersonModel = require("../models/ServiceRequestTypeWisePerson.model");

async function getAll() {
    try {
        const data = await ServiceRequestTypeWisePersonModel.find();
        return {
            error: false,
            data,
            message: "Get all ServiceRequestTypeWisePerson",
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
        const data = await ServiceRequestTypeWisePersonModel.findById(id);
        return {
            error: false,
            data,
            message: "Get ServiceRequestTypeWisePerson by id",
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
        const data = await ServiceRequestTypeWisePersonModel.create(formData);
        return {
            error: false,
            data,
            message: "Insert new ServiceRequestTypeWisePerson",
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
        const data = await ServiceRequestTypeWisePersonModel.findByIdAndUpdate(id, formData);
        return {
            error: false,
            data,
            message: "Update ServiceRequestTypeWisePerson",
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
        const data = await ServiceRequestTypeWisePersonModel.findByIdAndDelete(id);
        return {
            error: false,
            data,
            message: "Delete ServiceRequestTypeWisePerson",
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
