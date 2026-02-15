require('dotenv').config();
const mongoose = require('mongoose');
const ServiceRequestStatus = require('../models/ServiceRequestStatus.model');

const listStatuses = async () => {
    try {
        if (!process.env.MONGO_URL) {
            console.log("MONGO_URL is missing!");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URL);

        const statuses = await ServiceRequestStatus.find({});
        console.log("Statuses found:");
        statuses.forEach(s => {
            console.log(`- ${s.serviceRequestStatusName} (${s.serviceRequestStatusSystemName})`);
        });

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

listStatuses();
