require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.model');

const checkUsers = async () => {
    try {
        console.log("Connecting to DB...");
        if (!process.env.MONGO_URL) {
            console.log("MONGO_URL is missing!");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");
        console.log("Using Connection String:", process.env.MONGO_URL.replace(/:([^@]+)@/, ':****@')); // Hide password

        const admin = await User.findOne({ email: 'admin@srms.com' });
        if (admin) {
            console.log("Found Admin User:");
            console.log(JSON.stringify(admin, null, 2));
        } else {
            console.log("Admin user 'admin@srms.com' NOT FOUND.");
        }

        const allUsers = await User.find({}, 'email role');
        console.log("Total Users in DB:", allUsers.length);
        console.log("First 5 users:", allUsers.slice(0, 5));

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkUsers();
