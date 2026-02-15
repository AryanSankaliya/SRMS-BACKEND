require('dotenv').config(); // Load .env from current directory
const mongoose = require('mongoose');
const User = require('../models/User.model');

const createAdmin = async () => {
    try {
        console.log("Connecting to DB...");
        // Assuming running from Back-End root or scripts folder, try to find .env
        // But since I'm running via tool, I should make sure MONGO_URL is available or I can hardcode it if I knew it.
        // Better to rely on dotenv finding it.
        if (!process.env.MONGO_URL) {
            // Fallback or error
            console.error("MONGO_URL not found in env");
        }

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");

        const adminEmail = 'admin@srms.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin already exists:", existingAdmin.email);
            // Optionally update password if needed
            // existingAdmin.password = 'admin';
            // await existingAdmin.save();
            // console.log("Admin password reset to 'admin'");
        } else {
            const newAdmin = new User({
                firstName: 'System',
                lastName: 'Admin',
                email: adminEmail,
                password: 'admin', // Plain text as per existing service
                enrollmentNo: 'ADMIN001',
                role: 'Admin',
                department: 'Administration',
                mobile: '1234567890',
                isActive: true
            });

            await newAdmin.save();
            console.log("Admin created successfully");
            console.log("Email:", adminEmail);
            console.log("Password: admin");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();
