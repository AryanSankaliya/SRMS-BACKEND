const ServiceDeptPersonModel = require("../models/ServiceDeptPerson.model");

async function getAll() {
    try {
        const data = await ServiceDeptPersonModel.find();
        return {
            error: false,
            data,
            message: "Get all ServiceDeptPerson",
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
        const data = await ServiceDeptPersonModel.findById(id);
        return {
            error: false,
            data,
            message: "Get ServiceDeptPerson by id",
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
        const data = await ServiceDeptPersonModel.create(formData);
        return {
            error: false,
            data,
            message: "Insert new ServiceDeptPerson",
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
        const data = await ServiceDeptPersonModel.findByIdAndUpdate(id, formData);
        return {
            error: false,
            data,
            message: "Update ServiceDeptPerson",
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
        const data = await ServiceDeptPersonModel.findByIdAndDelete(id);
        return {
            error: false,
            data,
            message: "Delete ServiceDeptPerson",
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
