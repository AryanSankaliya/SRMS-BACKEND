const StaffModel = require("../models/Staff.model");

// 1. GET ALL STAFF
async function getAll() {
  try {
    // Password field ko hata diya (-password) taaki security bani rahe
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
        email: formData.email.toLowerCase() 
    });
    
    if (existingStaff) {
      throw new Error("Email already exists! Please use a different email.");
    }

    // Note: Production me password hash karna chahiye (bcrypt use karke),
    // lekin abhi simple rakh rahe hain.
    const data = await StaffModel.create({
        ...formData,
        email: formData.email.toLowerCase()
    });

    return {
      error: false,
      data, // Return data me password dikhega, chahe to hata dena response se
      message: "New Staff Member Added",
    };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

// 4. UPDATE STAFF
async function update(id, formData) {
  try {
    // Agar Email update ho raha hai, to check karo kisi aur ka to nahi hai
    if (formData.email) {
      const existingStaff = await StaffModel.findOne({
        email: formData.email.toLowerCase(),
        _id: { $ne: id } // Khud ko chhod kar check karo
      });

      if (existingStaff) throw new Error("Email already registered by another staff member.");
    }

    const data = await StaffModel.findByIdAndUpdate(id, formData, { new: true }).select("-password");
    
    return { error: false, data, message: "Staff Profile Updated" };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

// 5. DELETE STAFF
async function deleteById(id) {
  try {
    // Future me check lagana padega ki agar Staff kisi active ticket pe kaam kar raha hai
    // to delete na ho.
    const data = await StaffModel.findByIdAndDelete(id);
    return { error: false, data, message: "Staff Member Deleted" };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

// 6. LOGIN (Bonus Function: Frontend ke liye kaam aayega)
async function login(email, password) {
    try {
        const staff = await StaffModel.findOne({ email: email.toLowerCase() });
        if (!staff) throw new Error("User not found");

        // Simple string comparison (Production me bcrypt.compare use karna)
        if (staff.password !== password) throw new Error("Invalid Password");

        if (!staff.isActive) throw new Error("Your account is deactivated. Contact Admin.");

        // Password hata kar data bhejo
        const { password: pass, ...staffData } = staff.toObject();

        return { error: false, data: staffData, message: "Login Successful" };
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
  login
};