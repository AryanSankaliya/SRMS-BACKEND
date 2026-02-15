require('dotenv').config();
const mongoose = require('mongoose');
const Staff = require('../models/Staff.model');

const createDemoTech = async () => {
    try {
        if (!process.env.MONGO_URL) {
            console.log("MONGO_URL is missing!");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URL);

        const email = "tech@srms.com";
        const password = "password123";

        let tech = await Staff.findOne({ email });

        if (!tech) {
            tech = await Staff.create({
                name: "Demo Technician",
                email: email,
                password: password,
                mobile: "9876543210",
                designation: "Technician",
                isActive: true
            });
            console.log("Created Demo Technician.");
        } else {
            // Update password just in case
            tech.password = password;
            await tech.save();
            console.log("Updated Demo Technician password.");
        }

        console.log(`\ncredentials:\nEmail: ${email}\nPassword: ${password}`);

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

createDemoTech();
