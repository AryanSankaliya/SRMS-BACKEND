require('dotenv').config();
const mongoose = require('mongoose');
const Staff = require('../models/Staff.model');

const createHOD = async () => {
    try {
        console.log("Connecting to DB...");
        if (!process.env.MONGO_URL) {
            console.log("MONGO_URL is missing!");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");

        const hodEmail = 'admin@srms.com';
        const existingStaff = await Staff.findOne({ email: hodEmail });

        if (existingStaff) {
            console.log("Staff with this email already exists:", existingStaff.email);
            // Ensure designation is HOD
            if (existingStaff.designation !== "HOD") {
                existingStaff.designation = "HOD";
                await existingStaff.save();
                console.log("Updated designation to HOD");
            }
        } else {
            const newHOD = new Staff({
                name: 'System HOD',
                email: hodEmail,
                password: 'admin', // Plain text
                mobile: '1234567890',
                designation: 'HOD',
                isActive: true
            });

            await newHOD.save();
            console.log("HOD Staff created successfully");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error creating HOD:", error);
        process.exit(1);
    }
};

createHOD();
