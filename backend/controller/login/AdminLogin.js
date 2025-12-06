import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../../model/AdminSchema.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email,password);
    

    // ---------------------- VALIDATIONS ----------------------
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ---------------------- FIND ADMIN ----------------------
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // ---------------------- CHECK PASSWORD ----------------------
    const isMatched = await bcrypt.compare(password, admin.password);

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // ---------------------- CREATE JWT TOKEN ----------------------
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET
    );

    // Remove password before sending
    const { password: pwd, ...adminData } = admin._doc;

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      admin: adminData,
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
