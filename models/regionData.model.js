const mongoose = require('mongoose');

const regionDataSchema = new mongoose.Schema({
  region: { type: String, required: true },
  totalOrders: { type: Number, required: true },
  successfulDeliveries: { type: Number, required: true },
  pendingDeliveries: { type: Number, required: true },
  failedDeliveries: { type: Number, required: true },
  revenue: { type: Number, required: true }
});

const RegionData = mongoose.model('RegionData', regionDataSchema);
module.exports = RegionData;
