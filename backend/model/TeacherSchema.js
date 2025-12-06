import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
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
      default: "teacher",
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

    registerNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    }
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
