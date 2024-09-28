// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const FileModel = require('../models/uploadModel');

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads'); // Change this to your desired directory
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file
  },
});

// Initialize multer
const upload = multer({ storage });

// Route to upload profile photo
router.post('/upload', upload.single('profilePhoto'), async (req, res) => {
  if (req.file) {
    try {
      const newFile = new FileModel({
        filename: req.file.filename,
        filepath: `/uploads/${req.file.filename}`,
      });
      await newFile.save();

      return res.json({
        success: true,
        message: 'File uploaded successfully',
        filePath: newFile.filepath,
      });
    } catch (error) {
        console.error(error); 
      return res.status(500).json({ success: false, message: 'Database error' });
    }
  }
  res.status(400).json({ success: false, message: 'File upload failed' });
});

module.exports = router;
