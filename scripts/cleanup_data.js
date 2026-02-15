require('dotenv').config();
const mongoose = require('mongoose');
const ServiceRequest = require('../models/ServiceRequest.model');
const ServiceRequestTypeWisePerson = require('../models/ServiceRequestTypeWisePerson.model');

const cleanData = async () => {
    try {
        console.log("Connecting to DB...");
        if (!process.env.MONGO_URL) {
            console.log("MONGO_URL is missing!");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");

        // Delete all Service Requests
        const reqResult = await ServiceRequest.deleteMany({});
        console.log(`Deleted ${reqResult.deletedCount} Service Requests.`);

        // Delete all Mappings (Technician Assignments)
        const mapResult = await ServiceRequestTypeWisePerson.deleteMany({});
        console.log(`Deleted ${mapResult.deletedCount} Auto-Assignment Mappings.`);

        console.log("Cleanup complete!");
        process.exit(0);
    } catch (error) {
        console.error("Error cleaning data:", error);
        process.exit(1);
    }
};

cleanData();
