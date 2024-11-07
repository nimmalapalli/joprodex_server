const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  user_id:{type:mongoose.Schema.ObjectId},
  name: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  current_stock: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Warehouse', warehouseSchema);
