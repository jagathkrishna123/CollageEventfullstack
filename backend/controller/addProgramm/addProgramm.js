import Programming from "../../model/ProgrameSchema.js";

// Add a new programming
export const addProgramming = async (req, res) => {
  try {
    const { name } = req.body;

    // Validation
    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Programming name is required",
      });
    }

    // Check if already exists (optional)
    const existing = await Programming.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This programming already exists",
      });
    }

    const newProgramming = new Programming({ name: name.trim() });
    await newProgramming.save();

    res.status(201).json({
      success: true,
      message: "Programming added successfully",
      programming: newProgramming,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
