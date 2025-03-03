const mongoose = require('mongoose');

// Define the ServiceCharge schema
const serviceChargeSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  serviceCharge: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create a model based on the schema
const ServiceCharge = mongoose.model('ServiceCharge', serviceChargeSchema);

module.exports = ServiceCharge;
