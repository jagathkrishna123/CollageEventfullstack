import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Teacher from "../../model/TeacherSchema.js";

export const teacherLogin = async (req, res) => {
  try {
    const { registerNumber, password } = req.body;

    console.log("Login Request:", req.body);

    // ---------------------- VALIDATIONS ----------------------
    if (!registerNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "Register Number and password are required",
      });
    }

    const regNum = registerNumber.toUpperCase();

    // ---------------------- FIND TEACHER ----------------------
    const teacher = await Teacher.findOne({ registerNumber: regNum });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // ---------------------- CHECK PASSWORD ----------------------
    const isMatched = await bcrypt.compare(password, teacher.password);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // ---------------------- CREATE JWT TOKEN ----------------------
    const token = jwt.sign(
      { id: teacher._id, role: teacher.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Remove password before sending
    const { password: pwd, ...teacherData } = teacher._doc;

    return res.status(200).json({
      success: true,
      message: "Teacher login successful",
      token,
      teacher: teacherData,
    });

  } catch (error) {
    console.error("Teacher Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
