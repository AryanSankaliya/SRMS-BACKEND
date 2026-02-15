require('dotenv').config();
const mongoose = require('mongoose');
const Staff = require('../models/Staff.model');

const listStaff = async () => {
    try {
        if (!process.env.MONGO_URL) {
            console.log("MONGO_URL is missing!");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URL);

        const staff = await Staff.find({});
        console.log("Staff Accounts:");
        staff.forEach(s => {
            console.log(`- Name: ${s.name}, Email: ${s.email}, Role: ${s.role}, Designation: ${s.designation}`);
        });

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

listStaff();
