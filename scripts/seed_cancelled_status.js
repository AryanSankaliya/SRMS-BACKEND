require('dotenv').config();
const mongoose = require('mongoose');
const ServiceRequestStatus = require('../models/ServiceRequestStatus.model');
const Staff = require('../models/Staff.model');

const seedCancelled = async () => {
    try {
        if (!process.env.MONGO_URL) {
            console.log("MONGO_URL is missing!");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URL);

        // Get Admin for createdBy
        const admin = await Staff.findOne();
        if (!admin) {
            console.log("No staff found.");
            process.exit(1);
        }

        const cancelledStatus = await ServiceRequestStatus.findOne({ serviceRequestStatusSystemName: "CANCELLED" });

        if (!cancelledStatus) {
            await ServiceRequestStatus.create({
                serviceRequestStatusName: "Cancelled",
                serviceRequestStatusSystemName: "CANCELLED",
                description: "Request cancelled by user or admin",
                createdByUserId: admin._id,
                isActive: true
            });
            console.log("Created 'Cancelled' status.");
        } else {
            console.log("'Cancelled' status already exists.");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

seedCancelled();
