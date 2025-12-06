import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },

    programmingName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    incharge: {
      type: String,
      required: true,
      enum: ["Teacher", "Student"],
    },

    departmentConducting: {
      type: String,
      required: true,
    },

    participationLimit: {
      type: Number,
      required: true,
      min: 1,
    },

    // ⭐ File (image/pdf) stored directly in MongoDB
    file: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
