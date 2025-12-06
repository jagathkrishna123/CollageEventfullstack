import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../../model/StudentSchema.js";

export const studentLogin = async (req, res) => {
  try {
    const { registerNumber, password } = req.body;

    // ---------------------- VALIDATION ----------------------
    if (!registerNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "Register number and password are required",
      });
    }

    const regNum = registerNumber.toUpperCase();

    // ---------------------- FIND STUDENT ----------------------
    const student = await Student.findOne({ registerNumber: regNum });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // ---------------------- CHECK PASSWORD ----------------------
    const isMatched = await bcrypt.compare(password, student.password);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // ---------------------- CREATE JWT TOKEN ----------------------
    const token = jwt.sign(
      { id: student._id, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Remove password from response
    const { password: pwd, ...studentData } = student._doc;

    return res.status(200).json({
      success: true,
      message: "Student login successful",
      token,
      student: studentData,
    });

  } catch (error) {
    console.error("Student Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
