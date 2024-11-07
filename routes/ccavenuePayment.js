// Example in Node.js/Express
const express = require('express');
const router = express.Router();
const { createPaymentRequest } = require('../controller/ccavenueService');

router.post('/initiate', (req, res) => {
  const orderDetails = req.body;

  // Create CCAvenue payment request with encrypted data
  const paymentUrl = createPaymentRequest(orderDetails);

  // Send the redirect URL back to the Angular frontend
  res.json({ redirectUrl: paymentUrl });
});

module.exports = router;