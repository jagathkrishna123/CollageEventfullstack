import Event from "../../model/EventSchema.js";

export const addEvent = async (req, res) => {
  try {
    const {
      eventName,
      programmingName,
      description,
      date,
      startTime,
      endTime,
      venue,
      incharge,
      departmentConducting,
      participationLimit,
    } = req.body;

    // -------------------- VALIDATION --------------------
    if (
      !eventName ||
      !programmingName ||
      !description ||
      !date ||
      !startTime ||
      !endTime ||
      !venue ||
      !incharge ||
      !departmentConducting ||
      !participationLimit
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // -------------------- FILE HANDLING --------------------
    let fileData = null;

    if (req.file) {
      fileData = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    // -------------------- CREATE EVENT --------------------
    const newEvent = new Event({
      eventName,
      programmingName,
      description,
      date,
      startTime,
      endTime,
      venue,
      incharge,
      departmentConducting,
      participationLimit,
      file: fileData,
    });

    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error while creating event:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
