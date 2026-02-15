require('dotenv').config();
const mongoose = require('mongoose');
const ServiceRequestType = require('../models/ServiceRequestType.model');
const ServiceType = require('../models/ServiceType.model');
const ServiceDept = require('../models/ServiceDept.model');
const Campus = require('../models/Campus.model');
const Staff = require('../models/Staff.model');

const seedTypes = async () => {
    try {
        console.log("Connecting to DB...");
        if (!process.env.MONGO_URL) {
            console.log("MONGO_URL is missing!");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");

        // 1. Get Admin User (as Creator)
        const admin = await Staff.findOne();
        if (!admin) {
            console.log("No staff found to attribute creation to.");
            process.exit(1);
        }

        // 2. Ensure at least one Campus exists
        let campus = await Campus.findOne({ campusName: "Main Campus" });
        if (!campus) {
            campus = await Campus.create({
                campusName: "Main Campus",
                campusCode: "MAIN",
                address: "University Main Building"
            });
            console.log("Created Default Main Campus");
        }

        // 3. Ensure at least one Service Department exists
        let dept = await ServiceDept.findOne({ serviceDepartmentName: "IT Department" });
        if (!dept) {
            dept = await ServiceDept.create({
                serviceDeptName: "IT Department", // Corrected field name
                campusId: campus._id,
                description: "Central IT Support",
                createdByUserId: admin._id,
                isActive: true
            });
            console.log("Created Default IT Department");
        }

        // 4. Ensure at least one Service Type exists
        let sType = await ServiceType.findOne({ serviceTypeName: "General Service" });
        if (!sType) {
            sType = await ServiceType.create({
                serviceTypeName: "General Service",
                serviceTypeCode: "GEN",
                serviceDeptId: dept._id,
                createdByUserId: admin._id
            });
            console.log("Created Default Service Type");
        }

        // 5. Seed Service Request Types
        const types = [
            { name: "Hardware Issue", desc: "Monitor, CPU, Mouse, Keyboard issues" },
            { name: "Software Installation", desc: "OS, Antivirus, Office, etc." },
            { name: "Network/Internet", desc: "Slow internet, LAN issues" },
            { name: "Printer/Scanner", desc: "Toner refill, driver installation" },
            { name: "Smart Classroom", desc: "Projector, Audio system issues" },
            { name: "Lab Maintenance", desc: "PC cleaning, wire management" },
            { name: "ID Card Request", desc: "New or replacement ID card" },
            { name: "Wi-Fi Configuration", desc: "Access point issues" },
            { name: "Email Access", desc: "Password reset, new email" },
            { name: "File Server Access", desc: "Permission issues" }
        ];

        for (const type of types) {
            const existing = await ServiceRequestType.findOne({ serviceRequestTypeName: type.name });
            if (!existing) {
                await ServiceRequestType.create({
                    serviceRequestTypeName: type.name,
                    description: type.desc,
                    serviceTypeId: sType._id,
                    serviceDeptId: dept._id,
                    createdByUserId: admin._id,
                    isActive: true
                });
                console.log(`Created: ${type.name}`);
            } else {
                console.log(`Exists: ${type.name}`);
            }
        }

        console.log("Seeding complete!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding types:", error);
        process.exit(1);
    }
};

seedTypes();
