import bcrypt from "bcrypt";
import Teacher from "../../model/TeacherSchema.js";
import Student from "../../model/StudentSchema.js";

export const register = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      mobile,
      department,
      semester,
      RegisterNumber,
    } = req.body;

    console.log("Incoming Data:", req.body);

    // ---------------------- BASIC VALIDATIONS ----------------------
    if (!name || !email || !password || !mobile || !department || !RegisterNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Uppercase department safely
    department = department.toUpperCase();

    // ---------------------- ROLE DETECTION ----------------------
    let role = "";
    const prefix = RegisterNumber.slice(0, 3).toUpperCase();

    if (prefix === "AED") {
      role = "Teacher";
    } else if (prefix === "SFA") {
      role = "Student";
    } else {
      return res.status(400).json({ message: "Invalid Register Number prefix" });
    }

    // ---------------------- EMAIL FORMAT CHECK ----------------------
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // ---------------------- PASSWORD VALIDATION ----------------------
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // ---------------------- MOBILE VALIDATION ----------------------
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ message: "Mobile number must be 10 digits" });
    }

    // ---------------------- EXTRA STUDENT VALIDATION ----------------------
    if (role === "Student" && !semester) {
      return res.status(400).json({ message: "Semester is required for students" });
    }

    // ---------------------- DUPLICATE CHECK ----------------------
    if (role === "Teacher") {
      const existingTeacher = await Teacher.findOne({ email });
      if (existingTeacher) {
        return res.status(400).json({ message: "Teacher already exists" });
      }
    } else if (role === "Student") {
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: "Student already exists" });
      }
    }

    // ---------------------- HASH PASSWORD ----------------------
    const hashedPassword = await bcrypt.hash(password, 10);

    // ---------------------- CREATE NEW USER ----------------------
    let newUser;

    if (role === "Teacher") {
      newUser = new Teacher({
        name,
        email,
        password: hashedPassword,
        mobile,
        department,
        role,
        registerNumber: RegisterNumber,
      });
    } else if (role === "Student") {
      newUser = new Student({
        name,
        email,
        password: hashedPassword,
        mobile,
        department,
        semester,
        registerNumber: RegisterNumber,
        role,
      });
    }

    // Save user to DB
    await newUser.save();

    res.status(201).json({
      success: true,
      message: `${role} registered successfully`,
      user: newUser,
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
};
