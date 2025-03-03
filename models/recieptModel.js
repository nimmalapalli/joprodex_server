const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  logo: String,
  supportEmail: String,
  customer: {
    mobile: String,
    orderBarcode: String,
    address: String,
  },
  warehouse: {
    pickupAddress: String,
    rtoAddress: String,
    gstNumber: String,
    rtoContactName: String,
  },
  productDetails: [
    {
      sku: String,
      qty: Number,
      name: String,
    },
  ],
  orderDate: Date,
  deliveryDate: Date,
  totalAmount: Number,
  discount: Number,
});

module.exports = mongoose.model('Receipt', receiptSchema);
