import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      default: "student",
    },

    mobile: {
      type: String,
      required: true,
      minlength: 10,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: String, // or Number if you prefer
      required: false,
      trim: true,
    },

    registerNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    }
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
