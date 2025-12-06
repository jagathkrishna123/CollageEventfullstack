import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    // Expecting: Authorization: Bearer <token>

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

      req.user = decoded; 
      // decoded contains { id: user._id, role: user.role }

      next();
    });
  } catch (error) {
    console.error("JWT Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
