const StudentModel = require("../models/Student.model");
const jwt = require("jsonwebtoken");

// 1. REGISTER STUDENT
async function register(formData) {
    try {
        // Validation: Duplicate Email Check
        const existingStudentEmail = await StudentModel.findOne({
            email: formData.email.toLowerCase(),
        });

        if (existingStudentEmail) {
            throw new Error("Email already registered! Please login.");
        }

        // Validation: Duplicate Enrollment No Check
        const existingStudentEnrollment = await StudentModel.findOne({
            enrollmentNo: formData.enrollmentNo,
        });

        if (existingStudentEnrollment) {
            throw new Error("Enrollment Number already registered!");
        }

        const data = await StudentModel.create({
            ...formData,
            email: formData.email.toLowerCase(),
        });

        return {
            error: false,
            data,
            message: "Student Registration Successful",
        };
    } catch (error) {
        return { error: true, message: error.message };
    }
}

// 2. LOGIN STUDENT
async function login(email, password) {
    try {
        const student = await StudentModel.findOne({ email: email.toLowerCase() });
        if (!student) throw new Error("Student not found");

        if (student.password !== password) throw new Error("Invalid Password");

        if (!student.isActive) throw new Error("Account is inactive. Please contact admin.");

        const token = jwt.sign(
            {
                _id: student._id,
                email: student.email,
                role: "Student",
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const studentWithoutPassword = student.toObject();
        delete studentWithoutPassword.password;

        return {
            error: false,
            data: { ...studentWithoutPassword, token },
            message: "Login Successful",
        };
    } catch (error) {
        return { error: true, message: error.message };
    }
}

// 3. GET ALL STUDENTS (Optional/For Admin)
async function getAll() {
    try {
        const data = await StudentModel.find().select("-password").sort({ firstName: 1 });
        return { error: false, data, message: "Get all students" };
    } catch (error) {
        return { error: true, message: error.message };
    }
}

// 4. GET STUDENT BY ID
async function getById(id) {
    try {
        const data = await StudentModel.findById(id).select("-password");
        return { error: false, data, message: "Get student profile" };
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
