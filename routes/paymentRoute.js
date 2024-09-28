const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../models/user');
const razorpayInstance = new Razorpay({
  key_id: 'rzp_live_c9gjRSnJZSE8xC', // Replace with your key_id
  key_secret: 'DO23BYZWVIFUpmmeMTXrKC2J' // Replace with your key_secret
});



router.post('/create-order', async (req, res) => {
    const { amount, currency, receipt } = req.body;
  
    // Validate amount to ensure it's at least 200
    if (amount < 200) {
      return res.status(400).json({ message: 'Amount must be at least 200' });
    }
  
    const options = {
      amount: amount * 100, // Amount in paise (Razorpay expects amount in the smallest currency unit)
      currency: currency || 'INR',
      receipt: receipt || 'receipt#1',
      payment_capture: 1
    };
  
    try {
      const order = await razorpayInstance.orders.create(options);
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Verify Payment Signature and Update Wallet
  router.post('/verify-payment', async (req, res) => {
    const { order_id, payment_id, signature, user_id, amount } = req.body;
  
    // Generate expected signature using Razorpay secret
    const generated_signature = crypto.createHmac('sha256', 'YOUR_RAZORPAY_SECRET_KEY')
      .update(`${order_id}|${payment_id}`)
      .digest('hex');
  
    if (generated_signature === signature) {
      // Find the user by ID
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user's wallet with the actual paid amount
      const paidAmount = amount; // The actual paid amount in rupees
      user.wallet.balance += paidAmount;
      user.wallet.transactions.push({
        type: 'credit',
        amount: paidAmount,
        description: 'Wallet top-up',
        date: new Date()
      });
  
      await user.save();
  
      res.json({ status: 'success', message: 'Payment verified and wallet credited' });
    } else {
      res.status(400).json({ status: 'error', message: 'Invalid signature' });
    }
  });
  

// Get User Wallet
router.get('/wallet/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
      const user = await User.findById(userId);
      if (user) {
          res.json({
              balance: user.wallet.balance,
              transactions: user.wallet.transactions
          });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch(error) {
      res.status(500).json({ message: error.message });
  }
});

// Make a Payment (Debit Wallet)
router.post('/make-payment', async (req, res) => {
  const { userId, amount, description } = req.body;

  try {
      const user = await User.findById(userId);
      if (user.wallet.balance >= amount) {
          user.wallet.balance -= amount;
          user.wallet.transactions.push({
              type: 'debit',
              amount: amount,
              description: description || 'Payment made',
              date: new Date()
          });
          await user.save();
          res.json({ status: 'success', message: 'Payment successful', balance: user.wallet.balance });
      } else {
          res.status(400).json({ status: 'error', message: 'Insufficient balance' });
      }
  } catch(error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;