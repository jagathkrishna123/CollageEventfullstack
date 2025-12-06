import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import adminRoutes from "./routes/adminRoute.js";
import registerRoute from "./routes/registerRoute.js";
import TeacherRoute from "./routes/teacherRoute.js";
import StudentRoute from "./routes/studentRoute.js";
import AddeventRoute from "./routes/addEventRoute.js";
import addProgrammRoute from "./routes/addProgrammRoure.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ⭐ Serve uploaded files
app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/admin", adminRoutes);
app.use("/", registerRoute);
app.use("/teacher", TeacherRoute);
app.use("/student", StudentRoute);
app.use("/event", AddeventRoute);
app.use("/programming", addProgrammRoute);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
