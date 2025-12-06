import mongoose from "mongoose";

// Define the schema
const programmingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // name is mandatory
      trim: true      // removes extra spaces
    }
  },
  { timestamps: true } // optional: adds createdAt and updatedAt
);

// Create the model
const Programming = mongoose.model("Programming", programmingSchema);

export default Programming;
