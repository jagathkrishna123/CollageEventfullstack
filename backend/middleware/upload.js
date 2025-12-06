import multer from "multer";
import path from "path";

// Storage: Save files in /public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// File filtering (allow images + pdf + webp)
const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "application/pdf",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only images (PNG, JPG, JPEG, WEBP) and PDF files are allowed"),
      false
    );
  }
};

// Multer setup (50 MB limit)
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
});
