const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        enrollmentNo: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        mobile: {
            type: String,
            trim: true,
        },
        department: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        role: {
            type: String,
            default: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", UserSchema, "User");
