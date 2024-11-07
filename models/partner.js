// models/partner.js
const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  // existing fields
  name:String,
  baseRate: Number,
  weightSurcharge: Number,
  dimensionSurcharge: Number,
  expressSurcharge: Number,
  insuranceRate: Number,
  zoneSurcharges: Map,

  // New fields for service charge
  serviceChargeFixed: { type: Number, default: 0 },
  serviceChargePercentage: { type: Number, default: 0 }
});

const Partner = mongoose.model('Partner', partnerSchema);
module.exports = Partner;

