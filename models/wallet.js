const mongoose = require('mongoose');
const transactionSchema = require('../models/transaction'); // Import the transaction schema

const walletSchema = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0 // Initially, the wallet balance is set to 0
  },
  transactions: [transactionSchema] // Array of transaction records
});

module.exports = walletSchema;
