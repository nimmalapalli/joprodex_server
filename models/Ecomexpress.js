// models/Shipment.js

const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    awb: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Shipment = mongoose.model('Ecomexpress', shipmentSchema);

module.exports = Shipment;
