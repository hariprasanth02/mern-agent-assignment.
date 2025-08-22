// routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");

const router = express.Router();

// Simple file upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Route
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ filename: req.file.filename, path: `/uploads/${req.file.filename}` });
});

module.exports = router;
