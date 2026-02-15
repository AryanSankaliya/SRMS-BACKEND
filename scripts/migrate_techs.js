require("dotenv").config({ path: "../.env" }); // Adjust path if needed
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Staff = require("../models/Staff.model");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ DB Connected");
    } catch (error) {
        console.error("❌ DB Connection Error:", error);
        process.exit(1);
    }
};

const migrate = async () => {
    await connectDB();

    try {
        // 1. Clear Staff Table
        console.log("🗑️ Clearing Staff table...");
        await Staff.deleteMany({});
        console.log("✅ Staff table cleared.");

        // 2. Find Technicians in User Table
        console.log("🔍 Finding Technicians in User table...");
        const techUsers = await User.find({ role: "Technician" });
        console.log(`found ${techUsers.length} technicians in User table.`);

        // 3. Move them to Staff Table
        if (techUsers.length > 0) {
            const staffToInsert = techUsers.map(user => ({
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                password: user.password,
                mobile: user.mobile,
                designation: "Technician",
                isActive: true
            }));

            await Staff.insertMany(staffToInsert);
            console.log(`✅ Migrated ${staffToInsert.length} technicians to Staff table.`);

            // 4. Delete them from User Table
            const userIds = techUsers.map(u => u._id);
            await User.deleteMany({ _id: { $in: userIds } });
            console.log("✅ Deleted migrated technicians from User table.");
        }

        // 5. Add New Dummy Technicians
        const newTechs = [
            {
                name: "Rahul Sharma",
                email: "rahul.tech@example.com",
                password: "password123",
                mobile: "9988776655",
                designation: "Technician",
                isActive: true
            },
            {
                name: "Amit Verma",
                email: "amit.tech@example.com",
                password: "password123",
                mobile: "9123456789",
                designation: "Technician",
                isActive: true
            }
        ];

        await Staff.insertMany(newTechs);
        console.log("✅ Added 2 new dummy technicians (Rahul & Amit).");

    } catch (error) {
        console.error("❌ Migration Error:", error);
    } finally {
        mongoose.disconnect();
        console.log("👋 Disconnected.");
    }
};

migrate();
