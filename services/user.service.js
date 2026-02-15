const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");

// 1. REGISTER USER
async function register(formData) {
    try {
        // Validation: Duplicate Email Check
        const existingUserEmail = await UserModel.findOne({
            email: formData.email.toLowerCase(),
        });

        if (existingUserEmail) {
            throw new Error("Email already registered! Please login.");
        }

        // Validation: Duplicate Enrollment No Check
        const existingUserEnrollment = await UserModel.findOne({
            enrollmentNo: formData.enrollmentNo,
        });

        if (existingUserEnrollment) {
            throw new Error("Enrollment Number already registered!");
        }

        const data = await UserModel.create({
            ...formData,
            email: formData.email.toLowerCase(),
        });

        return {
            error: false,
            data,
            message: "User Registration Successful",
        };
    } catch (error) {
        return { error: true, message: error.message };
    }
}

// 2. LOGIN USER
async function login(email, password) {
    try {
        console.log("Login Attempt Email:", email);
        console.log("Looking for:", email.toLowerCase());
        const user = await UserModel.findOne({ email: email.toLowerCase() });
        console.log("User Found:", user ? user.email : "NULL");
        if (!user) throw new Error("User not found");

        if (user.password !== password) throw new Error("Invalid Password");

        if (!user.isActive) throw new Error("Account is inactive. Please contact admin.");

        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return {
            error: false,
            data: { ...userWithoutPassword, token },
            message: "Login Successful",
        };
    } catch (error) {
        return { error: true, message: error.message };
    }
}

// 3. GET ALL USERS (Optional/For Admin)
async function getAll() {
    try {
        const data = await UserModel.find().select("-password").sort({ firstName: 1 });
        return { error: false, data, message: "Get all users" };
    } catch (error) {
        return { error: true, message: error.message };
    }
}

// 4. GET USER BY ID
async function getById(id) {
    try {
        const data = await UserModel.findById(id).select("-password");
        return { error: false, data, message: "Get user profile" };
    } catch (error) {
        return { error: true, message: error.message };
    }
}

module.exports = {
    register,
    login,
    getAll,
    getById,
};
