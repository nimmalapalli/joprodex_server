const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  shipmentDetails: Object,
  pickupLocation: Object,
  shipmentResponse: Object,
  orderStatus: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;