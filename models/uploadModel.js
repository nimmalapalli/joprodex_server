// models/fileModel.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const FileModel = mongoose.model('File', fileSchema);
module.exports = FileModel;
