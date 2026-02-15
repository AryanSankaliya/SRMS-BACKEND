require('dotenv').config();
const mongoose = require('mongoose');
const Staff = require('../models/Staff.model');

const cleanAndReset = async () => {
    try {
        if (!process.env.MONGO_URL) {
            console.log("MONGO_URL is missing!");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URL);

        // 1. Delete the "Demo Technician" I just created
        const deleteResult = await Staff.deleteOne({ email: "tech@srms.com" });
        console.log(`Deleted Demo Technician (tech@srms.com): ${deleteResult.deletedCount}`);

        // 2. Find and reset passwords for Rahul and Amit
        const techs = await Staff.find({
            email: { $in: ["rahul.tech@example.com", "amit.tech@example.com"] }
        });

        for (const tech of techs) {
            tech.password = "123456"; // Reset to simple password
            await tech.save();
            console.log(`Reset password for ${tech.name} (${tech.email}) to: 123456`);
        }

        if (techs.length === 0) {
            console.log("Could not find Rahul or Amit. Check emails.");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

cleanAndReset();
