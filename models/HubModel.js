// models/HubModel.js
const mongoose = require('mongoose');

const HubModelSchema = new mongoose.Schema({
  hub: { type: String, required: true, unique: true },
  models: { type: [String], required: true },
});

const HubModel = mongoose.model('HubModel', HubModelSchema);

module.exports = HubModel;
