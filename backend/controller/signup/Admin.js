import Admin from "../../model/AdminSchema.js";
import bcrypt from "bcrypt";

// Create Admin
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, mobile, role } = req.body;

    // ---------------------- VALIDATIONS ----------------------
    // 1. Name validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res
        .status(400)
        .json({ message: "Name must be a valid string (min 2 characters)" });
    }

    // 2. Email validation
    if (!email || typeof email !== "string") {

      
      return res
        .status(400)
        .json({ message: "Email is required and must be a string" });
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 3. Password validation
    if (!password || typeof password !== "string" || password.length < 6) {
        
      return res.status(400).json({
        message: "Password must be a string and at least 6 characters long",
      });
    
      
    }

    // 4. Mobile validation
    if (!mobile || typeof mobile !== "string") {
      return res.status(400).json({ message: "Mobile number is required" });
    }
    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ message: "Mobile number must be exactly 10 digits" });
    }

    // 5. Role validation (optional)
    const allowedRoles = ["admin", "superadmin"];
    if (role && !allowedRoles.includes(role.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid role. Allowed roles: admin, superadmin",
      });
    }

    // 6. Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // ---------------------- HASH PASSWORD ----------------------
    const hashedPassword = await bcrypt.hash(password, 10);

    // ---------------------- CREATE ADMIN ----------------------
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
      mobile,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.log("Create Admin Error:", error);
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};