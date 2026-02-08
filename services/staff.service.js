const StaffModel = require("../models/Staff.model");
const jwt = require("jsonwebtoken");

// 1. GET ALL STAFF
async function getAll() {
  try {
    const data = await StaffModel.find().select("-password").sort({ name: 1 });

    return {
      error: false,
      data,
      message: "Get all staff members",
    };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

// 2. GET STAFF BY ID
async function getById(id) {
  try {
    const data = await StaffModel.findById(id).select("-password");
    return { error: false, data, message: "Get staff profile" };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

// 3. CREATE NEW STAFF (Registration)
async function insert(formData) {
  try {
    // Validation: Duplicate Email Check
    const existingStaff = await StaffModel.findOne({
      email: formData.email.toLowerCase(),
    });

    if (existingStaff) {
      throw new Error("Email already exists! Please use a different email.");
    }

    
    const data = await StaffModel.create({
      ...formData,
      email: formData.email.toLowerCase(),
    });

    return {
      error: false,
      data,
      message: "New Staff Member Added",
    };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

// 4. UPDATE STAFF
async function update(id, formData) {
  try {
    if (formData.email) {
      const existingStaff = await StaffModel.findOne({
        email: formData.email.toLowerCase(),
        _id: { $ne: id }, 
      });

      if (existingStaff)
        throw new Error("Email already registered by another staff member.");
    }

    const data = await StaffModel.findByIdAndUpdate(id, formData, {
      new: true,
    }).select("-password");

    return { error: false, data, message: "Staff Profile Updated" };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

// 5. DELETE STAFF
async function deleteById(id) {
  try {
  
    const data = await StaffModel.findByIdAndDelete(id);
    return { error: false, data, message: "Staff Member Deleted" };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

async function login(email, password) {
  try {
    const user = await StaffModel.findOne({ email: email.toLowerCase() });
    if (!user) throw new Error("User not found");

    if (user.password !== password) throw new Error("Invalid Password");

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.designation,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
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

module.exports = {
  getAll,
  getById,
  insert,
  update,
  deleteById,
  login,
};
